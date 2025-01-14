import { Effect } from 'effect';

import { AuthenticationEvent } from '@/entities/authentication-event';
import { BadImplementationError } from '@/repositories/errors/base-errors';

/**
 * TODO: Actually implement this function to send a notification through WhatsApp api
 * So far, it just logs the verification link to the console for testing purposes
 *
 * @param authenticationEvent - Authentication event to notify through WhatsApp api
 * @returns Effect that represents the result of the operation
 */
export const notifyAuthEventThroughWhatsapp = (
  authEvent: AuthenticationEvent,
) => {
  let notificationLink: string | undefined;

  const token = authEvent.data?.token;

  if (!token)
    return Effect.fail(
      new BadImplementationError(
        'Invalid authentication event data. Missing token.',
      ),
    );

  if (authEvent.type === 'accountVerificationRequest')
    notificationLink = `http://localhost:3000/auth/verify-account?token=${token}`;
  else if (authEvent.type === 'resetPasswordRequest')
    notificationLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  if (!notificationLink)
    return Effect.fail(
      new BadImplementationError('Invalid authentication event type', {
        type: authEvent.type,
      }),
    );

  // TODO: Implement the actual notification sending logic here
  console.log('[>] Sending notification through WhatsApp: ', notificationLink);

  return Effect.succeed(undefined);
};
