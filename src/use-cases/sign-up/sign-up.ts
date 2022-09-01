import { User } from '@/entities'
import { InvalidEmailError } from '@/entities/errors'
import { Either, left } from '@/shared'
import { UseCase, UserData } from '@/use-cases/protocols'

export class SignUp implements UseCase {
  async perform (userSignupRequest: UserData): Promise<Either<InvalidEmailError, User>> {
    return left(new InvalidEmailError(userSignupRequest.email))
  }
}
