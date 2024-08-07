export const AUTHENTICATION_STATES = [
  'signIn',
  'singUp',
  'forgotPassword',
  'resetPassword',
] as const;

export type AuthenticationState = (typeof AUTHENTICATION_STATES)[number];

export interface AuthenticationProps {
  state: AuthenticationState;
  className?: string;
}
