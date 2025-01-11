import { Context } from 'effect';

export interface SignUpNoVerifiedAccountInput {
  userName: string;
  phone: string;
  firstName: string;
  lastName: string;
  password: string;
}

export class SignUpNoVerifiedAccountInputTag extends Context.Tag(
  'SignUpNoVerifiedAccountInputTag',
)<SignUpNoVerifiedAccountInputTag, SignUpNoVerifiedAccountInput>() {}
