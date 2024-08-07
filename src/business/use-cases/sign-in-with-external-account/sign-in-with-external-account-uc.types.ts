import type { UserAccountType, UserAccountDetails } from '@/entities';

export interface SignInWithExternalAccountUCParams {
  account: {
    type: UserAccountType;
    details: UserAccountDetails;
  };
}
