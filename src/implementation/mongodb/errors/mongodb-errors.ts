import { assert } from '@/utils/error/assert';

export abstract class MongoBaseError {
  readonly e: Error;

  constructor(exception: unknown) {
    this.e = assert(exception);
  }
}

export class ReadError extends MongoBaseError {
  readonly _tag = 'ReadError';
}

export class WriteError extends MongoBaseError {
  readonly _tag = 'WriteError';
}

export class ParseError extends MongoBaseError {
  readonly _tag = 'ParseError';
}
