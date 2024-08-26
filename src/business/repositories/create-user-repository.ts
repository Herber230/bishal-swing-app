import type { User } from '@/entities/user';
import { Effect } from 'effect';

export interface CreateUserRepository {
  (
    // TODO: Solve eslint false positive
    // eslint-disable-next-line no-unused-vars
    user: Omit<User, 'id'>,
  ): Effect.Effect<User, unknown>;
}
