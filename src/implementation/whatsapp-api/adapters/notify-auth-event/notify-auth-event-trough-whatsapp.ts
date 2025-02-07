import { Effect } from 'effect';

import { AuthenticationEvent } from '@/entities/authentication-event';
import {
  BadImplementationError,
  MissingImplementationConfigError,
} from '@/repositories/errors/base-errors';
import {
  ImplementationConfig,
  ImplementationConfigTag,
} from '@/repositories/implementation-config-repository';
import { HttpError, FetchException } from '@/impl-common/implementation-errors';
import { performHttpRequest } from './lib/perform-http-request';

const getConfigurations = (configs: ImplementationConfig) => {
  const {
    whatsAppSenderPhoneNumberId,
    whatsAppAuthorizationToken,
    selfDomain,
  } = configs;
  const missing = [
    'whatsAppSenderPhoneNumberId',
    'whatsAppAuthorizationToken',
    'selfDomain',
  ].find(key => !configs[key]);

  return {
    error: missing ? new MissingImplementationConfigError(missing) : undefined,
    fromPhoneNumberId: whatsAppSenderPhoneNumberId,
    authorizationToken: whatsAppAuthorizationToken,
    selfDomain,
  };
};

const getEventData = (authEvent: AuthenticationEvent) => {
  const { token, phoneNumber } = authEvent.data || {};

  const missing = ['token', 'phoneNumber'].find(
    key => !(authEvent.data || {})[key],
  );

  return {
    error: missing
      ? new BadImplementationError(`Missing ${missing} in authEvent data`)
      : undefined,
    token,
    phoneNumber,
  };
};

const getNotificationLink = (
  authEvent: AuthenticationEvent,
  selfDomain: string,
  token: string,
) => {
  let link: string | undefined;

  if (authEvent.type === 'accountVerificationRequest')
    link = `${selfDomain}/auth/verify-account?token=${token}`;
  else if (authEvent.type === 'resetPasswordRequest')
    link = `${selfDomain}/auth/reset-password?token=${token}`;

  return {
    error: link
      ? undefined
      : new BadImplementationError(
          `Invalid auth event type : ${authEvent.type}`,
        ),
    notificationLink: link as string,
  };
};

/**
 * Sends a notification through WhatsApp api for the given authentication event
 * @param authenticationEvent - Authentication event to notify through WhatsApp api
 * @returns Effect that represents the result of the operation
 */
export const notifyAuthEventThroughWhatsapp = (
  authEvent: AuthenticationEvent,
) =>
  Effect.gen(function* () {
    const implementationConfig = yield* ImplementationConfigTag;

    // Get the configurations and fail if any of them is missing
    const {
      error: configError,
      fromPhoneNumberId,
      authorizationToken,
      selfDomain,
    } = getConfigurations(implementationConfig);
    if (configError) {
      yield* Effect.fail(configError);
    }

    // Get the event data and fail if any of them is missing
    const { error: implError, token, phoneNumber } = getEventData(authEvent);
    if (implError) {
      yield* Effect.fail(implError);
    }

    // Generate the notification link and fail if the event type is invalid
    const { error: implLinkError, notificationLink } = getNotificationLink(
      authEvent,
      selfDomain,
      token,
    );
    if (implLinkError) {
      yield* Effect.fail(implLinkError);
    }

    // Send the notification through WhatsApp api
    // TODO - Probable an utility to handle fetch requests and convert them to Effect
    yield* Effect.tryPromise({
      try: () =>
        performHttpRequest({
          fromPhoneNumberId,
          toPhoneNumber: phoneNumber,
          link: notificationLink,
          authorizationToken,
        }),
      catch: e => (e instanceof HttpError ? e : new FetchException(e)),
    });

    return;
  });
