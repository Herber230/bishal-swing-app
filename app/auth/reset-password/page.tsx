import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { verifyForgotPasswordTokenFromServer } from './actions';
import { AuthenticationWithResetPasswordContext } from './client';

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams;
  const session = await auth();
  if (session?.user) redirect('/home');

  const token = searchParams['token'];
  if (!token) {
    return <p>Bad url. Token is not present.</p>;
  }

  const verifyResult = await verifyForgotPasswordTokenFromServer(token);
  if (!verifyResult.success) {
    return <p>{verifyResult.message}</p>;
  }

  return <AuthenticationWithResetPasswordContext token={token} />;
}
