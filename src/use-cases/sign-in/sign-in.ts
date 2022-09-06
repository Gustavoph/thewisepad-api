import { Either } from '@/shared'
import { UserData, UseCase } from '@/use-cases/ports'
import { UserNotFoundError, WrongPasswordError } from '@/use-cases/auth/errors'
import { AuthenticationResult, AuthenticationService } from '@/use-cases/auth/ports'

export class SignIn implements UseCase {
  constructor (private readonly authentication: AuthenticationService) {
    this.authentication = authentication
  }

  public async perform (signinRequest: UserData):
  Promise<Either<UserNotFoundError | WrongPasswordError, AuthenticationResult>> {
    return await this.authentication.auth(
      {
        email: signinRequest.email,
        password: signinRequest.password
      }
    )
  }
}
