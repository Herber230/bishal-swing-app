import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import NextAuth, { User } from 'next-auth';
import { findUserByAccountInMongo } from '@/impl-mongodb/adapters/find-user-by-account';
import { signInWithCredentialsUC } from '@/use-cases/sign-in-with-with-credentials';
import { Effect } from 'effect';
import { SignInWithCredentialsRepository } from '@/repositories/sign-in-with-crecentials-repository';

interface UCredentials {
  emailOrUserName: string;
  password: string;
}

const bishalSwingCredentials = Credentials({
  credentials: {
    emailOrUserName: {},
    password: {},
  },
  authorize: async credentials => {
    const signInWithMongoCredentials = Effect.provideService(
      signInWithCredentialsUC,
      SignInWithCredentialsRepository,
      {
        input: credentials as UCredentials,
        find: findUserByAccountInMongo,
      },
    );

    const user = await Effect.runPromise(signInWithMongoCredentials);
    return user as User;
  },
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, bishalSwingCredentials],
});
