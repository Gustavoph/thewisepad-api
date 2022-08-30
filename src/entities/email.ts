import { Either, left, right } from '../shared'
import { valid } from './email-validator'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
    Object.freeze(this) // makes the object immutable
  }

  public static create (email: string): Either<Error, Email> {
    if (valid(email)) {
      return right(new Email(email))
    }

    return left(new Error(email))
  }
}
