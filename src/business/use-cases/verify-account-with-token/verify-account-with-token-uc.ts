import { Effect } from 'effect';

import { VerifyAccountWithTokenInputTag } from '@/repositories/verify-account-with-token-repository';
import { FindAuthEventTag } from '@/repositories/find-auth-event-repository';
import { FindUserTag } from '@/repositories/find-user-repository';
import { UpdateUserTag } from '@/repositories/update-user-repository';
import {
  AccountAlreadyVerifiedError,
  AccountNotFoundError,
} from '@/repositories/errors/user-account-errors';
import { User } from '@/entities/user';
import { AuthenticationEvent } from '@/entities/authentication-event';
import { UserAccount } from '@/entities/user-account';

export const verifyAccountWithTokenUC = Effect.gen(function* () {
  const input = yield* VerifyAccountWithTokenInputTag;
  const findAuthEvent = yield* FindAuthEventTag;
  const findUser = yield* FindUserTag;
  const updateUser = yield* UpdateUserTag;

  const possibleAuthEvent = yield* findAuthEvent({
    type: 'accountVerificationRequest',
    data: {
      token: input.token,
    },
  });
  if (!possibleAuthEvent) yield* Effect.fail(new AccountNotFoundError());
  const authEvent = possibleAuthEvent as AuthenticationEvent;

  const possibleUser = yield* findUser({
    id: authEvent.userId,
  });
  if (!possibleUser) yield* Effect.fail(new AccountNotFoundError());
  const user = possibleUser as User;

  const possibleAccount = user.accounts.find(
    account => account.identifier === authEvent.data?.accountIdentifier,
  );
  if (!possibleAccount) yield* Effect.fail(new AccountNotFoundError());
  const account = possibleAccount as UserAccount;
  if (account.verified) yield* Effect.fail(new AccountAlreadyVerifiedError());

  account.verified = true;

  yield* updateUser(user);

  return;
});
