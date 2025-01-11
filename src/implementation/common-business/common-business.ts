import { Effect } from 'effect';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

import { CommonBusinessUtils } from '@/repositories/common-business-repository';

export const commonBusiness: CommonBusinessUtils = {
  getCurrentTime: () => Effect.succeed(new Date()),
  getUuid: () => Effect.succeed(uuidv4()),
  hash: (data: string, level: 'soft' | 'hard') => {
    const shasum = crypto.createHash(level === 'soft' ? 'sha1' : 'sha256');
    shasum.update(data);
    return Effect.succeed(shasum.digest('hex'));
  },
};
