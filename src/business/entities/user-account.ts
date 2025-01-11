export type UserAccountType = 'email' | 'phone' | 'google' | 'facebook';

export type UserAccountDetails = Record<string, string | number | boolean>;

export interface UserAccount {
  type: UserAccountType;
  identifier: string;
  verified: boolean;
  details: UserAccountDetails;
}
