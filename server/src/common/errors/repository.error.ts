export enum RepositoryErrorKind {
  NOT_FOUND,
  DUPLICATE_ENTITY,
  INTERNAL_ERROR,
}

export class RepositoryError extends Error {
  constructor(readonly message: string, readonly kind: RepositoryErrorKind) {
    super(message);
  }
}
