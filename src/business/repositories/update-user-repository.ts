import { Context, Effect } from 'effect';
import { User } from '@/entities/user';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface UpdateUser {
  (
    // TODO: Solve this false positive
    // eslint-disable-next-line no-unused-vars
    params: User,
  ): Effect.Effect<
    User,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class UpdateUserTag extends Context.Tag('UpdateUserTag')<
  UpdateUserTag,
  UpdateUser
>() {}
