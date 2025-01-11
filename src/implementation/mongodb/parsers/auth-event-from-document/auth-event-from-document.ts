import { Document } from 'mongodb';
import { applySpec, pipe, prop, toString } from 'rambda';
import { AuthenticationEvent } from '@/entities/authentication-event';

export const authEventFromDocument: (
  // TODO: Solve eslint false positive
  // eslint-disable-next-line no-unused-vars
  document: Document,
) => AuthenticationEvent = applySpec({
  id: pipe(prop('_id'), toString),
  userId: pipe(prop('userId'), toString),
  createdAt: prop('createdAt'),
  type: prop('type'),
  data: prop('data'),
});
