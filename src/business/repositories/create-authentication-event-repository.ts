import { Effect, Context } from 'effect';
import type { AuthenticationEvent } from '@/entities/authentication-event';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface CreateAuthenticationEvent {
  (
    // TODO: Solve eslint false positive
    // eslint-disable-next-line no-unused-vars
    authenticationEvent: Omit<AuthenticationEvent, 'id'>,
  ): Effect.Effect<
    AuthenticationEvent,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class CreateAuthenticationEventTag extends Context.Tag(
  'CreateAuthenticationEventTag',
)<CreateAuthenticationEventTag, CreateAuthenticationEvent>() {}
