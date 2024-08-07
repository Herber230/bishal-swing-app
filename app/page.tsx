import { auth } from '@/auth';
import { redirect } from 'next/navigation';

// TODO: Remove this page and implement the redirect in the middleware
export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect('/home');
  } else {
    redirect('/login');
  }
}
