export class DuplicatedAccountError {
  readonly _tag = 'DuplicatedAccountError';
}

export class AccountNotFoundError {
  readonly _tag = 'AccountNotFoundError';
}

export class AccountAlreadyVerifiedError {
  readonly _tag = 'AccountAlreadyVerifiedError';
}

export class AccountNotVerifiedError {
  readonly _tag = 'AccountNotVerifiedError';
}

export class ExpiredTokenError {
  readonly _tag = 'ExpiredTokenError';
}
