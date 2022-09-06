import { Either } from '@/shared'
import { UseCase } from '@/use-cases/ports'
import { AuthenticationResult } from '@/use-cases/auth/ports'
import { badRequest, forbidden, ok } from '@/presentation/controllers/utils'
import { UserNotFoundError, WrongPasswordError } from '@/use-cases/auth/errors'
import { HttpRequest, HttpResponse, ControllerOperation } from '@/presentation/controllers/ports'

export class SignInOperation implements ControllerOperation {
  readonly requiredParams = ['email', 'password']
  private readonly useCase: UseCase

  constructor (useCase: UseCase) {
    this.useCase = useCase
  }

  async specificOp (request: HttpRequest): Promise<HttpResponse> {
    const response: Either<UserNotFoundError | WrongPasswordError, AuthenticationResult> =
      await this.useCase.perform({ email: request.body.email, password: request.body.password })

    if (response.isRight()) {
      return ok(response.value)
    }

    if (response.value instanceof WrongPasswordError) {
      return forbidden(response.value)
    }

    return badRequest(response.value)
  }
}
