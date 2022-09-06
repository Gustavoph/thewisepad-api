import { Either, left, right } from '@/shared'
import { Encoder, UserRepository } from '@/use-cases/ports'
import { UserNotFoundError, WrongPasswordError } from './errors'
import { AuthenticationParams, AuthenticationResult, AuthenticationService, TokenManager } from './ports'

export class Authentication implements AuthenticationService {
  constructor (
    private readonly encoder: Encoder,
    private readonly tokenManager: TokenManager,
    private readonly userRepository: UserRepository
  ) {
    this.encoder = encoder
    this.tokenManager = tokenManager
    this.userRepository = userRepository
  }

  async auth (authenticationParams: AuthenticationParams):
  Promise<Either<UserNotFoundError | WrongPasswordError, AuthenticationResult>> {
    const { email, password } = authenticationParams

    const user = await this.userRepository.findByEmail(email)
    if (!user) return left(new UserNotFoundError())

    const matches = await this.encoder.compare(password, user.password)
    if (!matches) return left(new WrongPasswordError())

    const accessToken = await this.tokenManager.sign({ id: user.id })

    return right({
      accessToken,
      id: user.id
    })
  }
}
