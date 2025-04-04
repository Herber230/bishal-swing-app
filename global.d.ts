// TODO: Fix false positive
/* eslint-disable no-unused-vars */
import type { User as UserEntity } from '@/entities/user';
import type { DefaultSession } from 'next-auth';
import type { ServerContext } from '@/server-context/server-context.types';
declare global {
  function getServerContextInstance(): ServerContext;

  type PageProps = {
    params: Promise<Record<string, string>>;
    searchParams: Promise<Record<string | string[], string | undefined>>;
  };
}

declare module 'next-auth' {
  interface User extends UserEntity {}
  interface Session extends DefaultSession {
    user: UserEntity;
  }
}

export {};
