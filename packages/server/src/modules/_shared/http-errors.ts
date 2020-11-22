import { StatusCodes } from 'http-status-codes'
import { HttpError } from 'routing-controllers'

// Doc: https://github.com/typestack/routing-controllers/blob/8d11d4a/README.md#throw-http-errors
// Example: https://github.com/typestack/routing-controllers/blob/8d11d4ac7b/src/http-error/NotFoundError.ts

export class UnprocessableEntityError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.UNPROCESSABLE_ENTITY, message)
    Object.setPrototypeOf(this, UnprocessableEntityError.prototype)
  }
}

export class ConflictError extends HttpError {
  constructor(message?: string) {
    super(StatusCodes.CONFLICT, message)
    Object.setPrototypeOf(this, ConflictError.prototype)
  }
}
