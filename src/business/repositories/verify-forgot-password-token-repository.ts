import { Context } from 'effect';

export interface VerifyForgotPasswordTokenInput {
  token: string;
}

export class VerifyForgotPasswordTokenInputTag extends Context.Tag(
  'VerifyForgotPasswordTokenInputTag',
)<VerifyForgotPasswordTokenInputTag, VerifyForgotPasswordTokenInput>() {}
