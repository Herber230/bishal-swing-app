import type { SignInWithExternalAccountRepository } from '@/repositories';
import type { SignInWithExternalAccountUCParams } from './sign-in-with-external-account-uc.types';
import { User } from '@/entities';

export async function signInWithExternalAccountUC(
  provider: SignInWithExternalAccountRepository,
  params: SignInWithExternalAccountUCParams,
) {
  const { findUser, createUser } = provider;
  const { account } = params;

  let user = await findUser(account);

  if (!user) {
    const newUserData: User = {
      id: undefined,
      name: '',
      accounts: [{ ...account, identifier: '' }],
    };

    user = await createUser(newUserData);
  }

  return user;
}
