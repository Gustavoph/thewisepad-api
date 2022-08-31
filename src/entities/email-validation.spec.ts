import { valid } from './email-validator'

describe('Email Validator', () => {
  test('should not accept null strings', () => {
    const email = null
    expect(valid(email)).toBeFalsy()
  })

  test('should not accept empty strings', () => {
    const email = ''
    expect(valid(email)).toBeFalsy()
  })
})
