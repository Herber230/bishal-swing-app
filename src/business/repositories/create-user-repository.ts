import { Context } from 'effect';

import type { User } from '@/entities/user';
import { Effect } from 'effect/Effect';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface CreateUser {
  (
    // TODO: Solve eslint false positive
    // eslint-disable-next-line no-unused-vars
    user: Omit<User, 'id'>,
  ): Effect<
    User,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class CreateUserTag extends Context.Tag('CreateUserTag')<
  CreateUserTag,
  CreateUser
>() {}
