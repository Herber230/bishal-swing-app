export class HttpError {
  readonly _tag = 'HttpError';
  readonly status: number;
  readonly message: string;
  readonly details?: Record<string, unknown>;

  constructor(
    status: number,
    message: string,
    details?: Record<string, unknown>,
  ) {
    this.status = status;
    this.message = message;
    this.details = details;
  }
}

export class FetchException {
  readonly _tag = 'FetchException';
  readonly error: unknown;

  constructor(error: unknown) {
    this.error = error;
  }
}
