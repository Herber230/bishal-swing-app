import { Button } from '@nextui-org/button';
import { FaGoogle } from 'react-icons/fa';
import { SignInWithGoogleProps } from './sign-in-with-google.types';
import { signIn } from '@/auth';

export function SignInWithGoogle({ className }: SignInWithGoogleProps) {
  return (
    <form
      className={className}
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <Button className="w-full bg-[#EA4335] text-white" type="submit">
        <FaGoogle className="mr-2" size={20} />
        Sign in with Google
      </Button>
    </form>
  );
}
