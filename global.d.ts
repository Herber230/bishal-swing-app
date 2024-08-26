// TODO: Fix false positive
/* eslint-disable no-unused-vars */
import type { User as UserEntity } from '@/entities/user';
import type { DefaultSession } from 'next-auth';

declare global {
  type PageProps = {
    params: Record<string, string>;
    searchParams: Record<string | string[], string | undefined>;
  };
}

declare module 'next-auth' {
  interface User extends UserEntity {}
  interface Session extends DefaultSession {
    user: UserEntity;
  }
}

export {};
