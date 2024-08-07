export type UserAccountType = 'email' | 'google' | 'facebook';

export type UserAccountDetails = Record<string, string | number | boolean>;

export interface UserAccount {
  type: UserAccountType;
  identifier: string;
  details: UserAccountDetails;
}
