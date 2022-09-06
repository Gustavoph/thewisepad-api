import { Either } from '@/shared'

export interface Payload {
  id: string
}

export interface TokenManager {
  sign: (info: Payload, expiresIn?: string) => Promise<string>
  verify: (token: string) => Promise<Either<Error, Payload>>
}
