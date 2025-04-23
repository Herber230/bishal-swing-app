import type { Document } from 'mongodb';
import type { User } from '@/entities/user';
import type { UserAccount } from '@/entities/user-account';
import { applySpec, forEach, pipe, prop, toString } from 'ramda';

const parseDocument = applySpec<User>({
  id: pipe(prop('_id'), toString),
  name: prop('name'),
  accounts: pipe(
    doc => (Array.isArray(doc.accounts) ? doc.accounts : []),
    forEach(
      applySpec<UserAccount>({
        type: prop('type'),
        identifier: prop('identifier'),
        details: prop('details'),
      }),
    ),
  ),
});

export const userFromDocument = (document: Document): User =>
  parseDocument(document);
