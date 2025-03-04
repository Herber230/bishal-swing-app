import { User } from '@/entities/user';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { CreateAuthenticationEventTag } from '@/repositories/create-authentication-event-repository';
import {
  AccountNotFoundError,
  AccountNotVerifiedError,
} from '@/repositories/errors/user-account-errors';
import {
  FindUserByAccountParams,
  FindUserByAccountTag,
} from '@/repositories/find-user-by-account-repository';
import {
  ForgotPasswordRepositoryInput,
  ForgotPasswordRepositoryInputTag,
} from '@/repositories/forgot-password-repository';
import { NotifyAuthenticationEventTag } from '@/repositories/notify-authentication-event';
import { Effect } from 'effect';

const getParameters = (
  input: ForgotPasswordRepositoryInput,
): FindUserByAccountParams => {
  if ('email' in input)
    return {
      type: 'email',
      identifier: input.email,
    };

  if ('phone' in input)
    return {
      type: 'phone',
      identifier: input.phone,
    };

  return {
    userName: input.userName,
  };
};

export const forgotPasswordUC = Effect.gen(function* () {
  const input = yield* ForgotPasswordRepositoryInputTag;
  const findUser = yield* FindUserByAccountTag;
  const createAuthEvent = yield* CreateAuthenticationEventTag;
  const businessUtils = yield* CommonBusinessUtilsTag;
  const notifyAuthEvent = yield* NotifyAuthenticationEventTag;

  // Find user by account using the common parameters composition
  const possibleUser = yield* findUser(getParameters(input));
  if (!possibleUser) yield* Effect.fail(new AccountNotFoundError());
  const user = possibleUser as User;

  // Check if the user has a verified phone account
  const phoneAccount = user.accounts.find(acc => acc.type === 'phone');
  if (!phoneAccount) yield* Effect.fail(new AccountNotFoundError());
  if (!phoneAccount?.verified)
    yield* Effect.fail(new AccountNotVerifiedError());
  const phoneNumber = phoneAccount?.identifier as string;

  // Generate a token and create an authentication event
  const token = `${yield* businessUtils.hash(user.name, 'soft')}-${yield* businessUtils.getUuid()}`;
  const authEvent = yield* createAuthEvent({
    userId: user.id,
    createdAt: yield* businessUtils.getCurrentTime(),
    type: 'resetPasswordRequest',
    data: {
      token,
      phoneNumber,
    },
  });

  console.log(`Token: ${token}`);

  yield* notifyAuthEvent(authEvent);

  return;
});
