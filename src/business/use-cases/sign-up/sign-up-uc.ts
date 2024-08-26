import {
  SignUpUserRepository,
  SignUpDuplicateAccountError,
} from '@/repositories/sign-up-user-repository';
import { Effect } from 'effect';

export const signUpUC = Effect.gen(function* () {
  const provider = yield* SignUpUserRepository;
  const { input, create, find } = provider;

  const existingUserByEmail = yield* find({
    identifier: input.email,
  });

  const existingUserByUserName = yield* find({
    userName: input.userName,
  });

  if (existingUserByEmail || existingUserByUserName) {
    yield* Effect.fail(new SignUpDuplicateAccountError());
  }

  const userResult = yield* create({
    name: input.userName,
    accounts: [
      {
        type: 'email',
        identifier: input.email,
        details: {
          password: input.password,
        },
      },
    ],
  });
  return userResult;
});
