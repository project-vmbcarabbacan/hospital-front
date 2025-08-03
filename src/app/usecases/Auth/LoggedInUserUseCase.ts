import { User } from '../../../domain/entities/User'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'

export class LoggedInUserUseCase {
  constructor(private authRepo: AuthRepository) { }

  async execute(): Promise<User> {
    return await this.authRepo.user()
  }
}
