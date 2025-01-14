import { Effect } from 'effect';
import { ResetPasswordRepositoryInputTag } from '@/repositories/reset-password-repository';
import { FindAuthEventTag } from '@/repositories/find-auth-event-repository';
import {
  AccountNotFoundError,
  ExpiredTokenError,
} from '@/repositories/errors/user-account-errors';
import { AuthenticationEvent } from '@/entities/authentication-event';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { FindUserTag } from '@/repositories/find-user-repository';
import { UpdateUserTag } from '@/repositories/update-user-repository';
import { User } from '@/entities/user';

export const resetPasswordUC = Effect.gen(function* () {
  const input = yield* ResetPasswordRepositoryInputTag;
  const findAuthEvent = yield* FindAuthEventTag;
  const businessUtils = yield* CommonBusinessUtilsTag;
  const findUser = yield* FindUserTag;
  const updateUser = yield* UpdateUserTag;

  const possibleAuthEvent = yield* findAuthEvent({
    type: 'resetPasswordRequest',
    data: {
      token: input.token,
    },
  });
  if (!possibleAuthEvent) yield* Effect.fail(new AccountNotFoundError());
  const authEvent = possibleAuthEvent as AuthenticationEvent;

  const now = yield* businessUtils.getCurrentTime();
  if (authEvent.expiresAt && now > authEvent.expiresAt)
    yield* Effect.fail(new ExpiredTokenError());

  const possibleUser = yield* findUser({
    id: authEvent.userId,
  });
  if (!possibleUser) yield* Effect.fail(new AccountNotFoundError());
  const user = possibleUser as User;

  const newEncryptedPassword = yield* businessUtils.hash(
    input.newPassword,
    'hard',
  );

  user.accounts.forEach(account => {
    if (account.type == 'email' || account.type == 'phone') {
      account.details.password = newEncryptedPassword;
    }
  });

  yield* updateUser(user);

  return;
});
