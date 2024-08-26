import { Authentication } from '@/components/organisms/authentication';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { createNewAccountInMongo } from './actions';

export default async function Page() {
  const session = await auth();

  if (session?.user) redirect('/home');

  return (
    <div className="flex">
      <Authentication
        className="mx-auto"
        state="signUp"
        serverAction={createNewAccountInMongo}
      />
    </div>
  );
}
