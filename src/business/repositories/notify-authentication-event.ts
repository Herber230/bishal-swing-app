import { Effect, Context } from 'effect';
import type { AuthenticationEvent } from '@/entities/authentication-event';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface NotifyAuthenticationEvent {
  (
    // TODO: Solve eslint false positive
    // eslint-disable-next-line no-unused-vars
    authenticationEvent: AuthenticationEvent,
  ): Effect.Effect<
    void,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class NotifyAuthenticationEventTag extends Context.Tag(
  'NotifyAuthenticationEventTag',
)<NotifyAuthenticationEventTag, NotifyAuthenticationEvent>() {}
