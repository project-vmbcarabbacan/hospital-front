import { User } from '../../../domain/entities/User'
import { AuthRepository } from '../../../domain/repositories/AuthRepository'
import { Email } from '../../../domain/valueObjects/Email'
import { Password } from '../../../domain/valueObjects/Password'
import { UserLoginDTO } from '../../DTO/UserLoginDTO'

export class LoginUseCase {
    constructor(private authRepo: AuthRepository) { }

    async execute(dto: UserLoginDTO): Promise<User> {
        if (!dto.email || !dto.password) throw new Error('Invalid input')

        const email = Email.create(dto.email)
        const password = Password.create(dto.password)

        return await this.authRepo.login(email, password)
    }
}
