import { Effect } from 'effect';
import { DuplicatedAccountError } from '@/repositories/errors/user-account-errors';
import { SignUpNoVerifiedAccountInputTag } from '@/repositories/sign-up-no-verified-account-repository';
import { FindUserByAccountTag } from '@/repositories/find-user-by-account-repository';
import { CreateUserTag } from '@/repositories/create-user-repository';
import { CreateAuthenticationEventTag } from '@/repositories/create-authentication-event-repository';
import { CommonBusinessUtilsTag } from '@/repositories/common-business-repository';
import { NotifyAuthenticationEventTag } from '@/repositories/notify-authentication-event';

export const signUpNoVerifiedAccountUC = Effect.gen(function* () {
  const input = yield* SignUpNoVerifiedAccountInputTag;
  const findUser = yield* FindUserByAccountTag;
  const createUser = yield* CreateUserTag;
  const createAuthEvent = yield* CreateAuthenticationEventTag;
  const notifyAuthEvent = yield* NotifyAuthenticationEventTag;
  const businessUtils = yield* CommonBusinessUtilsTag;

  const duplicates = [
    yield* findUser({
      userName: input.userName,
    }),
    yield* findUser({
      identifier: input.phone,
    }),
  ];
  if (duplicates.some(Boolean))
    yield* Effect.fail(new DuplicatedAccountError());

  const encryptedPassword = yield* businessUtils.hash(input.password, 'hard');
  const user = yield* createUser({
    name: input.userName,
    firstName: input.firstName,
    lastName: input.lastName,
    accounts: [
      {
        verified: false,
        type: 'phone',
        identifier: input.phone,
        details: {
          password: encryptedPassword,
        },
      },
    ],
  });

  const token = `${yield* businessUtils.hash(user.name, 'soft')}-${yield* businessUtils.getUuid()}`;
  const requestVerificationEvent = yield* createAuthEvent({
    userId: user.id,
    createdAt: yield* businessUtils.getCurrentTime(),
    type: 'accountVerificationRequest',
    data: {
      accountType: 'phone',
      accountIdentifier: input.phone,
      token,
    },
  });

  yield* notifyAuthEvent(requestVerificationEvent);

  return;
});
