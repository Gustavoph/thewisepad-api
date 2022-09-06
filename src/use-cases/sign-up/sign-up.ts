import { User } from '@/entities'
import { Either, left, right } from '@/shared'
import { ExistingUserError } from '@/use-cases/sign-up/errors'
import { InvalidEmailError, InvalidPasswordError } from '@/entities/errors'
import { UseCase, UserData, Encoder, UserRepository } from '@/use-cases/ports'

interface AuthenticationService {
  auth: string
}

export class SignUp implements UseCase {
  constructor (
    private readonly encoder: Encoder,
    private readonly userRepository: UserRepository,
    private readonly authentication: AuthenticationService
  ) {
    this.encoder = encoder
    this.userRepository = userRepository
    this.authentication = authentication
  }

  async perform (userSignupRequest: UserData):
  Promise<Either<ExistingUserError | InvalidEmailError | InvalidPasswordError, User>> {
    const { email, password } = userSignupRequest

    const userOrError = User.create(email, password)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const userAlreadyExists = await this.userRepository.findByEmail(email)
    if (userAlreadyExists) {
      return left(new ExistingUserError(userSignupRequest))
    }

    const encodedPassword = await this.encoder.encode(password)
    await this.userRepository.add({ email, password: encodedPassword })

    const response = await this.authentication.auth({ email, password })
    return right(response)
  }
}
