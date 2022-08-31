import { User } from '@/entities'

const validEmail = 'any@mail.com'
const validPassword = '1validpassword'
const invalidEmail = 'invalid_email'
const invalidPasswordWithNoNumbers = 'invalid'
const invalidPasswordWithTooFewCharacters = '123ab'
const emptyPassword = ''

describe('User domain entity', () => {
  test('should not create user if invalid email is provided', () => {
    const error = User.create(invalidEmail, validPassword)
    expect(error.name).toEqual('InvalidEmailError')
  })

  test('should not create user if invalid password is provided (no numbers)', () => {
    const error = User.create(validEmail, invalidPasswordWithNoNumbers)
    expect(error.name).toEqual('InvalidPasswordError')
  })

  test('should not create user if invalid password is provided (too few chars)', () => {
    const error = User.create(validEmail, invalidPasswordWithTooFewCharacters)
    expect(error.name).toEqual('InvalidPasswordError')
  })

  test('should not create user if invalid password is provided (empty)', () => {
    const error = User.create(validEmail, emptyPassword)
    expect(error.name).toEqual('InvalidPasswordError')
  })
})
