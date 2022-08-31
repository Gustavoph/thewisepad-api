import { Either, left, right } from '../shared'
import { Email } from './email'
import { InvalidEmailError, InvalidPasswordError } from './errors'
import { Password } from './password'

export class User {
  private readonly _email: Email
  private readonly _password: Password

  public get email (): Email {
    return this._email
  }

  public get password (): Password {
    return this._password
  }

  private constructor (email: Email, password: Password) {
    this._email = email
    this._password = password
    Object.freeze(this)
  }

  public static create (email: string, password: string):
  Either<InvalidEmailError | InvalidPasswordError, User> {
    const emailOrError = Email.create(email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError(email))
    }

    const passwordOrError = Password.create(password)
    if (passwordOrError.isLeft()) {
      return left(new InvalidPasswordError())
    }

    const emailObject = emailOrError.value
    const passwordObject = passwordOrError.value

    return right(new User(emailObject, passwordObject))
  }
}
