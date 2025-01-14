import { User } from '@/entities/user';
import { userFromDocument } from '@/impl-mongodb/parsers/user-from-document';
import { insertAndRead } from '@/impl-mongodb/composed-effects/insert-and-read';
import { BISHAL_USERS } from '@/impl-mongodb/constants/collections';

export const createUserInMongo = (newUser: Omit<User, 'id'>) =>
  insertAndRead(BISHAL_USERS, newUser, userFromDocument);
