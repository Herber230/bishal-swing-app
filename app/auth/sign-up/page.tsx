import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Authentication } from '@/components/organisms/authentication';

import { performSignUpFromServer } from './actions';

export default async function Page() {
  const session = await auth();

  if (session?.user) redirect('/home');

  return (
    <div className="flex">
      <Authentication
        className="mx-auto"
        state="signUp"
        serverAction={performSignUpFromServer}
      />
    </div>
  );
}
