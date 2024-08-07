import type { CreateUserRepository } from './create-user-repository';
import type { FindUserByAccountRepository } from './find-user-by-account-repository';

export interface SignInWithExternalAccountRepository {
  createUser: CreateUserRepository;
  findUser: FindUserByAccountRepository;
}
