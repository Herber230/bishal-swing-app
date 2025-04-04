import { auth, signOut } from '@/auth';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import Image from 'next/image';
import { Link } from '@heroui/link';

const placeHolders = [
  { title: 'Servicios' },
  { title: 'Ubicaciones' },
  { title: 'Contacto' },
  { title: 'Nuestras Metodologías' },
  { title: 'Agenda tu clase de prueba gratis' },
  { title: 'Pie de pagina' },
];

export default async function Page() {
  const session = await auth();

  return (
    <>
      <header className="flex flex-col justify-center items-center h-screen">
        <Image
          alt="Bishal Logo"
          src="/images/bishal-logo.png"
          width={350}
          height={200}
        />
        <Image
          alt="Bishal Name"
          src="/images/text-1.png"
          width={600}
          height={100}
        />
        <h1 className="mt-10">Hero Section</h1>
      </header>
      <section>
        <Divider className="border-black" />
        {session && (
          <div className="flex flex-col justify-center items-center h-[400px]">
            {`You're signed in as ${session.user.firstName && session.user.lastName ? `${session.user.firstName} ${session.user.lastName}` : session.user.name}`}
            <form
              action={async () => {
                'use server';
                await signOut();
              }}
            >
              <Button type="submit" color="primary" className="mt-5">
                Sign Out
              </Button>
            </form>
          </div>
        )}
        {!session && (
          <div>
            You are not signed in.
            <Link className="block mt-5" href="/auth/Sign-In">
              Go to Sign In
            </Link>
          </div>
        )}
      </section>
      {placeHolders.map((placeHolder, i) => (
        <section key={`section-${i}`}>
          <Divider className="border-black" />
          <div className="flex flex-col justify-center items-center h-[700px]">
            <h2>{placeHolder.title}</h2>
          </div>
        </section>
      ))}
    </>
  );
}
