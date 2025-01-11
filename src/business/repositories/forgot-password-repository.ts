import { Context } from 'effect';

export type ForgotPasswordRepositoryInput =
  | {
      phone: string;
    }
  | {
      userName: string;
    }
  | {
      email: string;
    };

export class ForgotPasswordRepositoryInputTag extends Context.Tag(
  'ForgotPasswordRepositoryInputTag',
)<ForgotPasswordRepositoryInputTag, ForgotPasswordRepositoryInput>() {}
