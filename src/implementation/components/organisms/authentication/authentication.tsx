import { AuthenticationProps } from './authentication.types';
import Image from 'next/image';
import { AuthenticationClientForm } from './authentication-client-form';

export function Authentication({
  className,
  serverAction,
  state,
  children,
}: AuthenticationProps) {
  return (
    <div
      className={`border border-gray-300 rounded-md p-4 mt-20 w-[350px] ${className}`}
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
      <AuthenticationClientForm serverAction={serverAction} state={state} />
      {children}
    </div>
  );
}
