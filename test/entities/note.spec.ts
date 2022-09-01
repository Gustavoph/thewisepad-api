
import { User, Note } from '@/entities'

const invalidTitle = ''
const validTitle = 'my note'
const validEmail = 'my@mail.com'
const validPassword = '1validpassword'
const validContent = 'content'
const validOwner: User = User.create(validEmail, validPassword).value as User

describe('Note entity', () => {
  test('should not be created with invalid title (is empty)', () => {
    const error = Note.create(validOwner, invalidTitle, validContent).value as Error
    expect(error.name).toBe('InvalidTitleError')
  })

  test('should be created with a valid title and owner', () => {
    const note: Note = Note.create(validOwner, validTitle, validContent).value as Note
    expect(note.title.value).toBe('my note')
    expect(note.owner.email.value).toBe('my@mail.com')
    expect(note.content).toBe(validContent)
  })

  test('should br created with empty content if content is undefined', () => {
    const undefinedContent = undefined
    const note: Note = Note.create(validOwner, validTitle, undefinedContent).value as Note
    expect(note.title.value).toBe('my note')
    expect(note.owner.email.value).toBe('my@mail.com')
    expect(note.content).toBe('')
  })
})
