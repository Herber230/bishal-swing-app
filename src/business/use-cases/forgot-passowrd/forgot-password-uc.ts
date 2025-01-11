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

  const searchParams = getParameters(input);
  const possibleUser = yield* findUser(searchParams);
  if (!possibleUser) yield* Effect.fail(new AccountNotFoundError());
  const user = possibleUser as User;

  const isActive = user.accounts.some(acc => acc.verified);
  if (!isActive) yield* Effect.fail(new AccountNotVerifiedError());

  const token = `${yield* businessUtils.hash(user.name, 'soft')}-${yield* businessUtils.getUuid()}`;
  const authEvent = yield* createAuthEvent({
    userId: user.id,
    createdAt: yield* businessUtils.getCurrentTime(),
    type: 'resetPasswordRequest',
    data: {
      token,
    },
  });

  yield* notifyAuthEvent(authEvent);

  return;
});
