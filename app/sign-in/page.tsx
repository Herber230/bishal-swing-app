import { Authentication } from '@/components/organisms/authentication';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
import { SignInWithFacebook } from '@/components/atoms/sign-in-with-facebook';
import { SignInWithGoogle } from '@/components/atoms/sign-in-with-google';

import { loginWithCredentialsFromServer } from './actions';

export default async function Page() {
  const session = await auth();

  if (session?.user) redirect('/home');

  return (
    <div className="flex">
      <Authentication
        className="mx-auto"
        state="signIn"
        serverAction={loginWithCredentialsFromServer}
      >
        <Link className="block mt-5" href="/forgot-password">
          Forgot password?
        </Link>
        <Link className="block mt-2" href="/sign-up">
          Create account?
        </Link>
        <Divider className="my-5" />
        <div className="flex flex-col">
          <p className="text-center font-light text-gray-500">
            Or use an external account
          </p>
          <SignInWithGoogle className="mt-5" />
          <SignInWithFacebook className="mt-5" />
        </div>
      </Authentication>
    </div>
  );
}
