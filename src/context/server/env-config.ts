import { requiredOrThrow } from '@/utils/string/required-or-throw';

// Read all the required environment variables
export const envConfig = {
  mongoConnectionUri: requiredOrThrow(
    'env.MONGO_CONNECTION_URI',
    process.env.MONGO_CONNECTION_URI,
  ),
  nodeEnv: requiredOrThrow('env.NODE_ENV', process.env.NODE_ENV),
  database: requiredOrThrow('env.BISHAL_SWING_DB', process.env.BISHAL_SWING_DB),
  selfDomain: requiredOrThrow('env.SELF_DOMAIN', process.env.SELF_DOMAIN),
  whatsAppSenderPhoneNumberId: requiredOrThrow(
    'env.WHATSAPP_SENDER_PHONE_NUMBER_ID',
    process.env.WHATSAPP_SENDER_PHONE_NUMBER_ID,
  ),
  whatsAppAuthorizationToken: requiredOrThrow(
    'env.WHATSAPP_AUTHORIZATION_TOKEN',
    process.env.WHATSAPP_AUTHORIZATION_TOKEN,
  ),
};
