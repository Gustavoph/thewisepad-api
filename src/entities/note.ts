import { Title, User } from '@/entities'
import { InvalidTitleError } from './errors'

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

  static create (owner: User, title: string, content: string): InvalidTitleError {
    return new InvalidTitleError(title)
  }
}
