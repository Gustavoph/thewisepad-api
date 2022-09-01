import { Title, User } from '@/entities'
import { Either, left, right } from '@/shared'
import { InvalidTitleError } from '@/entities/errors'

export class Note {
  private readonly _title: Title
  private readonly _owner: User
  private readonly _content: string

  get title () {
    return this._title
  }

  get owner () {
    return this._owner
  }

  get content () {
    return this._content
  }

  private constructor (owner: User, title: Title, content: string) {
    this._owner = owner
    this._title = title
    this._content = content
    Object.freeze(this)
  }

  static create (owner: User, title: string, content: string): Either<InvalidTitleError, Note> {
    const titleOrError = Title.create(title)
    if (titleOrError.isLeft()) {
      return left(new InvalidTitleError(title))
    }

    const titleObject = titleOrError.value
    const contentObject = !content ? '' : content
    return right(new Note(owner, titleObject, contentObject))
  }
}
