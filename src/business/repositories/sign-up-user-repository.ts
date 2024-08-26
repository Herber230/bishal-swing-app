import { Context } from 'effect';
import { CreateUserRepository } from './create-user-repository';
import { FindUserByAccountRepository } from './find-user-by-account-repository';

export interface SignUpUserRepositoryParams {
  userName: string;
  email: string;
  password: string;
}

export class SignUpDuplicateAccountError {
  readonly _tag = 'SignUpDuplicateAccountError';
}

export class SignUpUserRepository extends Context.Tag('SignUpUserRepository')<
  SignUpUserRepository,
  {
    readonly input: SignUpUserRepositoryParams;
    readonly find: FindUserByAccountRepository;
    readonly create: CreateUserRepository;
  }
>() {}
