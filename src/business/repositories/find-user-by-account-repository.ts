import type { User } from '@/entities/user';
import type {
  UserAccountDetails,
  UserAccountType,
} from '@/entities/user-account';
import { Effect } from 'effect';

export interface FindUserByAccountRepositoryParams {
  userName?: string;
  type?: UserAccountType;
  identifier?: string;
  details?: UserAccountDetails;
}

export interface FindUserByAccountRepository {
  (
    // TODO: Solve eslint false positive
    // eslint-disable-next-line no-unused-vars
    params: FindUserByAccountRepositoryParams,
  ): Effect.Effect<User | undefined, unknown>;
}
