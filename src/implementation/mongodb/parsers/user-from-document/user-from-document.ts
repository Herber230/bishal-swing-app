import type { Document } from 'mongodb';
import type { User } from '@/entities/user';
import { applySpec, forEach, pipe, prop, toString } from 'rambda';

const parseDocument = applySpec<User>({
  id: pipe(prop('_id'), toString),
  name: prop('name'),
  accounts: pipe(
    prop('accounts'),
    forEach(
      applySpec({
        type: prop('type'),
        identifier: prop('identifier'),
        details: prop('details'),
      }),
    ),
  ),
});

export const userFromDocument = (document: Document): User =>
  parseDocument(document);
