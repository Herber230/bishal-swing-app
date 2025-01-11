import { Context, Effect } from 'effect';
import { AuthenticationEvent } from '@/entities/authentication-event';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface FindAuthEvent {
  (
    // TODO: Solve this false positive
    // eslint-disable-next-line no-unused-vars
    params: Partial<AuthenticationEvent>,
  ): Effect.Effect<
    AuthenticationEvent | undefined,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class FindAuthEventTag extends Context.Tag('FindAuthEventTag')<
  FindAuthEventTag,
  FindAuthEvent
>() {}
