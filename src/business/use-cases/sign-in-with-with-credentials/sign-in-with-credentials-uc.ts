import { Effect } from 'effect';
import { User } from '@/entities/user';
import {
  SignInWithCredentialsInput,
  SignInWithCredentialsInputTag,
} from '@/repositories/sign-in-with-credentials-repository';
import {
  FindUserByAccountParams,
  FindUserByAccountTag,
} from '@/repositories/find-user-by-account-repository';
import {
  AccountNotFoundError,
  AccountNotVerifiedError,
} from '@/repositories/errors/user-account-errors';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';

const getParameters = (
  input: SignInWithCredentialsInput,
): FindUserByAccountParams => {
  const details = {
    password: input.password,
  };

  if ('email' in input)
    return {
      type: 'email',
      identifier: input.email,
      details,
    };

  if ('phone' in input)
    return {
      type: 'phone',
      identifier: input.phone,
      details,
    };

  return {
    userName: input.userName,
    details,
  };
};

export const signInWithCredentialsUC = Effect.gen(function* () {
  const input = yield* SignInWithCredentialsInputTag;
  const findUser = yield* FindUserByAccountTag;
  const businessUtils = yield* CommonBusinessUtilsTag;

  const searchParams = getParameters({
    ...input,
    password: yield* businessUtils.hash(input.password, 'hard'),
  });
  const possibleUser = yield* findUser(searchParams);
  if (!possibleUser) yield* Effect.fail(new AccountNotFoundError());
  const user = possibleUser as User;

  const isActive = user.accounts.some(acc => acc.verified);
  if (!isActive) yield* Effect.fail(new AccountNotVerifiedError());

  return user;
});
