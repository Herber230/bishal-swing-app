import { AuthenticationEvent } from '@/entities/authentication-event';
import { authEventFromDocument } from '@/impl-mongodb/parsers/auth-event-from-document';
import { insertAndRead } from '@/impl-mongodb/composed-effects/insert-and-read';
import { BISHAL_AUTHENTICATION_EVENTS } from '@/impl-mongodb/constants/collections';

export const createAuthEventInMongo = (
  newAuthEvent: Omit<AuthenticationEvent, 'id'>,
) =>
  insertAndRead(
    BISHAL_AUTHENTICATION_EVENTS,
    newAuthEvent,
    authEventFromDocument,
  );
