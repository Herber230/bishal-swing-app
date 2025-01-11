import { Context } from 'effect';

export interface ImplementationConfig {
  [key: string]: string;
}

export class ImplementationConfigTag extends Context.Tag(
  'ImplementationConfigTag',
)<ImplementationConfigTag, ImplementationConfig>() {}
