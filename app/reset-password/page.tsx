import { Authentication } from '@/components/organisms/authentication';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page({ searchParams }: PageProps) {
  const session = await auth();

  if (session?.user) redirect('/home');

  return (
    <div className="flex">
      <Authentication
        className="mx-auto"
        state="resetPassword"
        errorCode={searchParams.errorCode}
      />
    </div>
  );
}
