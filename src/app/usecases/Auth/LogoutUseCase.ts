import { AuthRepository } from '../../../domain/repositories/AuthRepository'

export class LogoutUseCase {
    constructor(private authRepo: AuthRepository) { }

    async execute(): void {
        return await this.authRepo.logout()
    }
}
