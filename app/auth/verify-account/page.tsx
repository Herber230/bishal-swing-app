import { VerifyToken } from './client';

export default function Page({ searchParams }: PageProps) {
  const token = searchParams['token'];
  if (!token)
    return (
      <p>
        Invalid link, the token is missing. Please check the message or try the
        complete process again
      </p>
    );

  return (
    <>
      <VerifyToken token={token} />
      <p>We are verifying your account. Please wait...</p>
    </>
  );
}
