export class NotFoundError extends Error {
  constructor(entity: string, id: number) {
    super(`${entity} with id ${id} not found`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
