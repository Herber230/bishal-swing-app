export abstract class ImplementationError {
  abstract readonly _tag: string;
}

export class MissingImplementationConfigError {
  readonly _tag = 'MissingImplementationConfigError';
  readonly key: string;

  constructor(key: string) {
    this.key = key;
  }
}

export class BadImplementationError {
  readonly _tag = 'BadImplementationError';
  readonly message: string;
  readonly details: Record<string, string | number | boolean> | undefined;

  constructor(
    message: string,
    details?: Record<string, string | number | boolean>,
  ) {
    this.message = message;
    this.details = details;
  }
}
