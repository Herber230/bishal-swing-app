import { AuthenticationProps } from './authentication.types';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Input } from '@nextui-org/input';
import { Link } from '@nextui-org/link';
import { SignInWithFacebook } from '@/components/atoms/sign-in-with-facebook';
import { SignInWithGoogle } from '@/components/atoms/sign-in-with-google';
import { signIn } from '@/auth';
import Image from 'next/image';

//TODO: Apply standard styling by a Theme configuration
export function Authentication({ className }: AuthenticationProps) {
  return (
    <div
      className={`border border-gray-300 rounded-md p-4 mt-20 w-[350px] ${className}`}
    >
      <form
        className="flex flex-col"
        action={async formData => {
          'use server';
          await signIn('credentials', formData);
        }}
      >
        <div className="flex flex-col items-center mb-5">
          <Image
            alt="Bishal Logo"
            src="/images/bishal-logo.png"
            width={100}
            height={100}
          />
          <Image
            alt="Bishal Name"
            src="/images/text-3.png"
            width={200}
            height={200}
          />
        </div>
        <Input
          className="mt-5"
          name="emailOrUserName"
          type="text"
          label="User or Email"
        />
        <Input
          className="mt-5"
          name="password"
          type="password"
          label="Password"
        />
        <Button className="mt-5" color="primary" type="submit">
          Log in
        </Button>
      </form>
      <Link className="block mt-2" href="/forgot-password">
        Forgot password?
      </Link>
      <Link className="block mt-2" href="/sign-in">
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
    </div>
  );
}
