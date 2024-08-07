import { Effect } from 'effect';
import { FindUserByAccountRepositoryParams } from '@/repositories/find-user-by-account-repository';
import { isValidEmail } from '@/utils/string/is-valid-email';
import { User } from '@/entities/user';
import {
  SignInWithCredentialsRepository,
  UserNotFoundError,
} from '@/repositories/sign-in-with-crecentials-repository';

export const signInWithCredentialsUC = Effect.gen(function* () {
  const provider = yield* SignInWithCredentialsRepository;
  const {
    find: findUser,
    input: { emailOrUserName, password },
  } = provider;

  let parameters: FindUserByAccountRepositoryParams = {
    type: 'email',
    details: {
      password,
    },
  };

  if (isValidEmail(emailOrUserName)) {
    parameters.identifier = emailOrUserName;
  } else {
    parameters.userName = emailOrUserName;
  }

  const userResult = yield* findUser(parameters);

  if (!userResult) {
    yield* Effect.fail(new UserNotFoundError());
  }

  return userResult as User;
});
