import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth';

import { bishalSwingCredentials } from './bishal-swing-credentials-provider';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, bishalSwingCredentials],
});
