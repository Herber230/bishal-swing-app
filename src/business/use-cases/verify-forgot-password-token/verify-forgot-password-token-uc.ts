import { Effect } from 'effect';
import { VerifyForgotPasswordTokenInputTag } from '@/repositories/verify-forgot-password-token-repository';
import { FindAuthEventTag } from '@/repositories/find-auth-event-repository';
import {
  AccountNotFoundError,
  ExpiredTokenError,
} from '@/repositories/errors/user-account-errors';
import { AuthenticationEvent } from '@/entities/authentication-event';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';

export const verifyForgotPasswordTokenUC = Effect.gen(function* () {
  const input = yield* VerifyForgotPasswordTokenInputTag;
  const findAuthEvent = yield* FindAuthEventTag;
  const businessUtils = yield* CommonBusinessUtilsTag;

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

  return;
});
