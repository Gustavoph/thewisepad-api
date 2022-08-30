import { Either, left, right } from '../shared'
import { InvalidPasswordError } from './errors'

export class Password {
  public readonly value: string

  private constructor (password: string) {
    this.value = password
    Object.freeze(this)
  }

  public static create (password: string): Either<InvalidPasswordError, Password> {
    if (valid(password)) {
      return right(new Password(password))
    }

    return left(new InvalidPasswordError())
  }
}

function valid (password: string): boolean {
  if (!password) return false

  if (noNumberIn(password) || tooShort(password)) {
    return false
  }

  return true
}

function noNumberIn (password: string): boolean {
  return !(/\d/.test(password))
}

function tooShort (password: string): boolean {
  return password.length < 6
}
