import { left } from '@/shared'
import { Email, Password } from '@/entities'
import { InvalidEmailError, InvalidPasswordError } from './errors'

export class User {
  public static create (email: string, password: string): InvalidEmailError | InvalidPasswordError {
    const emailOrError = Email.create(email)
    if (emailOrError.isLeft()) {
      return new InvalidEmailError(email)
    }

    const passwordOrError = Password.create(password)
    if (passwordOrError.isLeft()) {
      return new InvalidPasswordError()
    }
  }
}
