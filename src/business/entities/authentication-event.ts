import type { EntityId } from '@/entities/entity-id';

export type AuthenticationEventType =
  | 'logIn'
  | 'logOut'
  | 'accountVerificationRequest'
  | 'resetPasswordRequest';

export type AuthenticationEventData = Record<string, string>;

export interface AuthenticationEvent {
  id: EntityId;
  userId: EntityId;
  createdAt: Date;
  expiresAt?: Date;
  type: AuthenticationEventType;
  data?: AuthenticationEventData;
}
