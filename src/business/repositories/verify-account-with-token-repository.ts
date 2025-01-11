import { Context } from 'effect';

export interface VerifyAccountWithTokenInput {
  token: string;
}

export class VerifyAccountWithTokenInputTag extends Context.Tag(
  'VerifyAccountWithTokenInputTag',
)<VerifyAccountWithTokenInputTag, VerifyAccountWithTokenInput>() {}
