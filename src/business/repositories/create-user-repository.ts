import type { User } from '@/entities/user';

export interface CreateUserRepository {
  // TODO: Solve eslint false positive
  // eslint-disable-next-line no-unused-vars
  (user: User): Promise<User>;
}
