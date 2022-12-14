import { User } from '@/entities'

const validEmail = 'any@mail.com'
const validPassword = '1validpassword'
const invalidEmail = 'invalid_email'
const invalidPasswordWithNoNumbers = 'invalid'
const invalidPasswordWithTooFewCharacters = '123ab'
const emptyPassword = ''

describe('User domain entity', () => {
  test('should not create user if invalid email is provided', () => {
    const error = User.create(invalidEmail, validPassword).value as Error
    expect(error.name).toEqual('InvalidEmailError')
  })

  test('should not create user if invalid password is provided (no numbers)', () => {
    const error = User.create(validEmail, invalidPasswordWithNoNumbers).value as Error
    expect(error.name).toEqual('InvalidPasswordError')
  })

  test('should not create user if invalid password is provided (too few chars)', () => {
    const error = User.create(validEmail, invalidPasswordWithTooFewCharacters).value as Error
    expect(error.name).toEqual('InvalidPasswordError')
  })

  test('should not create user if invalid password is provided (empty)', () => {
    const error = User.create(validEmail, emptyPassword).value as Error
    expect(error.name).toEqual('InvalidPasswordError')
  })

  test('should create user if valid email and password is provided', () => {
    const user = User.create(validEmail, validPassword).value as User
    expect(user.email.value).toEqual(validEmail)
    expect(user.password.value).toEqual(validPassword)
  })
})
