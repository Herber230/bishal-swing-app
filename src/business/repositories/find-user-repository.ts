import { Context, Effect } from 'effect';
import { User } from '@/entities/user';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface FindUser {
  (
    // TODO: Solve this false positive
    // eslint-disable-next-line no-unused-vars
    params: Partial<User>,
  ): Effect.Effect<
    User | undefined,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class FindUserTag extends Context.Tag('FindUserTag')<
  FindUserTag,
  FindUser
>() {}
