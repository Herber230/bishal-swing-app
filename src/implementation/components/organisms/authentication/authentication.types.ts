import type { ServerAction } from '@/utils/next/types';

export const AUTHENTICATION_STATES = [
  'signIn',
  'signUp',
  'forgotPassword',
  'resetPassword',
] as const;

export type AuthenticationState = (typeof AUTHENTICATION_STATES)[number];

export interface AuthenticationProps {
  state: AuthenticationState;
  className?: string;
  serverAction: ServerAction;
}
