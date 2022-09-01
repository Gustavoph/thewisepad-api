import { InvalidEmailError } from '@/entities/errors'
import { SignUp } from './sign-up'

describe('SignUp use case', () => {
  test('should sign up user with valid data', async () => {
    const userData = {
      email: 'any@mail.com',
      password: 'any_password'
    }

    const sut = new SignUp()
    const error = await sut.perform(userData)
    expect(error.value).toEqual(new InvalidEmailError(userData.email))
  })

  test('should not sign up user with invalid email', async () => {
    const userData = {
      email: 'invalid.mail.com',
      password: 'any_password'
    }

    const sut = new SignUp()
    const userSignUpResponse = await sut.perform(userData)
    expect(userSignUpResponse.value).toEqual(new InvalidEmailError(userData.email))
  })
})
