import { HttpError } from '@/impl-common/implementation-errors';

export interface PerformHttpRequestParams {
  fromPhoneNumberId: string;
  toPhoneNumber: string;
  link: string;
  authorizationToken: string;
}

export const performHttpRequest = ({
  fromPhoneNumberId,
  toPhoneNumber,
  link,
  authorizationToken,
}: PerformHttpRequestParams) => {
  // Create the payload for the request using the whatsapp API documentation
  // https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages/
  const payload = {
    messaging_product: 'whatsapp',
    to: toPhoneNumber,
    type: 'template',
    template: {
      name: 'confirmation',
      language: {
        code: 'en',
      },
      components: [
        {
          type: 'body',
          parameters: [
            {
              parameter_name: 'link',
              type: 'text',
              text: link,
            },
          ],
        },
      ],
    },
  };

  // Perform the request and define base parsers
  return fetch(
    `https://graph.facebook.com/v21.0/${fromPhoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        content_type: 'application/json',
        authorization: `Bearer ${authorizationToken}`,
      },
      body: JSON.stringify(payload),
    },
  )
    .then(response =>
      Promise.all([response.status, response.statusText, response.json()]),
    )
    .then(([status, statusText, response]) => {
      if (status >= 200 && status < 300) {
        return undefined;
      }
      const { message, ...details } = response.error;
      throw new HttpError(status, `${statusText} - ${message}`, details);
    });
};
