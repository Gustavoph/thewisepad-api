import { valid } from './email-validator'
import { InvalidEmailError } from './errors'
import { Either, left, right } from '../shared'

export class Email {
  public readonly value: string

  private constructor (email: string) {
    this.value = email
    Object.freeze(this) // makes the object immutable
  }

  public static create (email: string): Either<InvalidEmailError, Email> {
    if (valid(email)) {
      return right(new Email(email))
    }

    return left(new InvalidEmailError(email))
  }
}
