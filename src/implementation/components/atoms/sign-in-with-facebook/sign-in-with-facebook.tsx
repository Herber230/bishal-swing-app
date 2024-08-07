import { Button } from '@nextui-org/button';
import { FaFacebook } from 'react-icons/fa';
import { SignInWithFacebookProps } from './sign-in-with-facebook.types';
import { signIn } from '@/auth';

export function SignInWithFacebook({ className }: SignInWithFacebookProps) {
  return (
    <form
      className={className}
      action={async () => {
        'use server';
        await signIn('facebook');
      }}
    >
      <Button className="w-full bg-[#1877F2] text-white" type="submit">
        <FaFacebook className="mr-2" size={20} />
        Sign in with Facebook
      </Button>
    </form>
  );
}
