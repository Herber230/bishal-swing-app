import { Effect, Context } from 'effect';
import Credentials from 'next-auth/providers/credentials';
import { findUserByAccountInMongo } from '@/impl-mongodb/adapters/find-user-by-account';
import { signInWithCredentialsUC } from '@/use-cases/sign-in-with-with-credentials';
import {
  SignInWithCredentialsInput,
  SignInWithCredentialsInputTag,
} from '@/repositories/sign-in-with-credentials-repository';
import { ImplementationConfigTag } from '@/repositories/implementation-config-repository';
import { envConfig } from '@/server-config';
import { FindUserByAccountTag } from '@/repositories/find-user-by-account-repository';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { commonBusiness } from '@/impl-common/business-utils';
import { AuthError, User } from 'next-auth';

export class BSCredentialsProviderError extends AuthError {
  public readonly kind = 'CredentialsSignin';
  public readonly friendlyMessageKey = 'invalidCredentials';

  constructor() {
    super('Invalid credentials for Bishal Swing Credentials provider');
    this.type = 'CredentialsSignin';
  }
}

const signInWithMongoCredentials = (input: SignInWithCredentialsInput) =>
  Effect.provide(
    signInWithCredentialsUC,
    Context.empty().pipe(
      Context.add(ImplementationConfigTag, envConfig),
      Context.add(SignInWithCredentialsInputTag, input),
      Context.add(FindUserByAccountTag, findUserByAccountInMongo),
      Context.add(CommonBusinessUtilsTag, commonBusiness),
    ),
  );

export const bishalSwingCredentials = Credentials({
  credentials: {
    password: {},
    userName: {},
    phone: {},
    email: {},
  },
  authorize: async credentials => {
    const result = (
      await Effect.runPromiseExit(
        signInWithMongoCredentials(credentials as SignInWithCredentialsInput),
      )
    ).toJSON() as any; // TODO: Create utility types

    // Here it is possible to add more specific error handling.
    // It must be through Errors that extend AuthError
    if (result._tag === 'Success' && result.value) {
      return result.value as User;
    } else if (
      result._tag === 'Failure' &&
      result.cause?.failure?._tag === 'AccountNotFoundError'
    ) {
      throw new BSCredentialsProviderError();
    }

    // This throws a common CallbackRouteError. Usually more details can be added in prior steps
    return null;
  },
});
