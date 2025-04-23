import { Document } from 'mongodb';
import { applySpec, pipe, prop, toString } from 'ramda';
import { AuthenticationEvent } from '@/entities/authentication-event';

export const authEventFromDocument: (
  // TODO: Solve eslint false positive
  // eslint-disable-next-line no-unused-vars
  document: Document,
) => AuthenticationEvent = applySpec({
  id: pipe(prop('_id'), toString),
  userId: prop('userId'),
  createdAt: prop('createdAt'),
  type: prop('type'),
  data: prop('data'),
});
