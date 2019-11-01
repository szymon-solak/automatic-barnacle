import { boundType } from '../types/bound-type'
import { Either } from '../types/either'

export type String800 = boundType<string, 'String800'>
export type String255 = boundType<string, 'String255'>

export const createString255 = (
  s: string
): Either<ValidationError, String255> => {
  if (s.length > 255) {
    return Either.left(
      new ValidationError('String cannot be longer than 255 characters')
    )
  }

  return Either.right(s as String255)
}

export const createString800 = (
  s: string
): Either<ValidationError, String800> => {
  if (s.length > 800) {
    return Either.left(
      new ValidationError('String cannot be longer than 800 characters!')
    )
  }

  return Either.right(s as String800)
}

export class ValidationError extends Error {
  public type = 'ValidationError' as const

  constructor(message: string) {
    super(message)

    this.message = message
    this.name = this.type

    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
