
import { User, Note } from '@/entities'

const invalidTitle = ''
// const validTitle = 'my note'
const validEmail = 'my@mail.com'
const validPassword = '1validpassword'
const validContent = 'content'
const validOwner: User = User.create(validEmail, validPassword).value as User

describe('Note entity', () => {
  test('should not be created with invalid title (is empty)', () => {
    const error = Note.create(validOwner, invalidTitle, validContent)
    expect(error.name).toBe('InvalidTitleError')
  })
})
