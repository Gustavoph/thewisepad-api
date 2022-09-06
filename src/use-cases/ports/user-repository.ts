import { UserData } from './user-data'

export interface UserRepository {
  add: (userData: UserData) => Promise<UserData>

  findAll: () => Promise<UserData[]>
  findByEmail: (email: string) => Promise<UserData>
}
