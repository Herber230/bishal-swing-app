import { Context } from 'effect';

export interface ResetPasswordRepositoryInput {
  newPassword: string;
  token: string;
}

export class ResetPasswordRepositoryInputTag extends Context.Tag(
  'ResetPasswordRepositoryInputTag',
)<ResetPasswordRepositoryInputTag, ResetPasswordRepositoryInput>() {}
