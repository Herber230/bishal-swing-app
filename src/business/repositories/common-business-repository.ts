import { Effect, Context } from 'effect';

export interface CommonBusinessUtils {
  getCurrentTime: () => Effect.Effect<Date>;
  getUuid: () => Effect.Effect<string>;
  // TODO: Solve eslint false positive
  // eslint-disable-next-line no-unused-vars
  hash: (data: string, level: 'soft' | 'hard') => Effect.Effect<string>;
}

export class CommonBusinessUtilsTag extends Context.Tag(
  'CommonBusinessUtilsTag',
)<CommonBusinessUtilsTag, CommonBusinessUtils>() {}
