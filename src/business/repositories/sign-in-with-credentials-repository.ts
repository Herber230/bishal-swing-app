import { Context } from 'effect';

export type SignInWithCredentialsInput =
  | {
      email: string;
      password: string;
    }
  | {
      phone: string;
      password: string;
    }
  | {
      userName: string;
      password: string;
    };

export class SignInWithCredentialsInputTag extends Context.Tag(
  'SignInWithCredentialsInputTag',
)<SignInWithCredentialsInputTag, SignInWithCredentialsInput>() {}
