import { Context } from 'effect';
import { FindUserByAccountRepository } from './find-user-by-account-repository';

export interface SignInWithCredentialsRepositoryInput {
  emailOrUserName: string;
  password: string;
}

export class UserNotFoundError {
  readonly _tag = 'UserNotFoundError';
}

export class SignInWithCredentialsRepository extends Context.Tag(
  'SignInWithCredentialsRepository',
)<
  SignInWithCredentialsRepository,
  {
    readonly input: SignInWithCredentialsRepositoryInput;
    readonly find: FindUserByAccountRepository;
  }
>() {}
