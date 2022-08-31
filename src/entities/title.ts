import { InvalidTitleError } from './errors'
import { Either, left, right } from '../shared'

export class Title {
  private readonly value: string

  private constructor (title: string) {
    this.value = title
    Object.freeze(this)
  }

  public static create (title: string): Either<InvalidTitleError, Title> {
    if (valid(title)) {
      return right(new Title(title))
    }

    return left(new InvalidTitleError('Title is invalid!'))
  }
}

function valid (title: string): boolean {
  if (emptyOrTooShort(title) || tooLarge(title)) {
    return false
  }

  return true
}

function emptyOrTooShort (title: string): boolean {
  return !title || title.trim().length < 3
}

function tooLarge (title: string): boolean {
  return title.length > 256
}
