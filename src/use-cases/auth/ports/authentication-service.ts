import { Either } from '@/shared'
import { WrongPasswordError, UserNotFoundError } from '@/use-cases/auth/errors'

export interface AuthenticationParams {
  email: string
  password: string
}

export interface AuthenticationResult {
  id: string
  accessToken: string
}

export interface AuthenticationService {
  auth: (authenticationParams: AuthenticationParams) =>
  Promise<Either<UserNotFoundError | WrongPasswordError, AuthenticationResult>>
}
