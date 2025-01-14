import { Effect, Context } from 'effect';
import type { AuthenticationEvent } from '@/entities/authentication-event';
import { ImplementationError } from './errors/base-errors';

export interface NotifyAuthenticationEvent {
  (
    // TODO: Solve eslint false positive
    // eslint-disable-next-line no-unused-vars
    authenticationEvent: AuthenticationEvent,
  ): Effect.Effect<void, ImplementationError>;
}

export class NotifyAuthenticationEventTag extends Context.Tag(
  'NotifyAuthenticationEventTag',
)<NotifyAuthenticationEventTag, NotifyAuthenticationEvent>() {}
