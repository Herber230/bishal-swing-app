import { Context, Effect } from 'effect';
import type { User } from '@/entities/user';
import type {
  UserAccountDetails,
  UserAccountType,
} from '@/entities/user-account';
import {
  ImplementationError,
  MissingImplementationConfigError,
} from './errors/base-errors';
import { ImplementationConfigTag } from './implementation-config-repository';

export interface FindUserByAccountParams {
  userName?: string;
  type?: UserAccountType;
  identifier?: string;
  details?: UserAccountDetails;
}

export interface FindUserByAccount {
  (
    // eslint-disable-next-line no-unused-vars
    params: FindUserByAccountParams,
  ): Effect.Effect<
    User | undefined,
    ImplementationError | MissingImplementationConfigError,
    ImplementationConfigTag
  >;
}

export class FindUserByAccountTag extends Context.Tag('FindUserByAccountTag')<
  FindUserByAccountTag,
  FindUserByAccount
>() {}
