import { requiredOrThrow } from '@/utils/string/required-or-throw';

// Read all the required environment variables
export const envConfig = {
  mongoConnectionUri: requiredOrThrow(
    'env.MONGO_CONNECTION_URI',
    process.env.MONGO_CONNECTION_URI,
  ),
  nodeEnv: requiredOrThrow('env.NODE_ENV', process.env.NODE_ENV),
  database: requiredOrThrow('env.BISHAL_SWING_DB', process.env.BISHAL_SWING_DB),
};
