import { ApiService } from '../api/ApiService'
import { AuthRepository } from '../../domain/repositories/AuthRepository'
import { User } from '../../domain/entities/User'
import axios from 'axios'
import { ApiError } from '../../domain/entities/ApiError'
import { Email } from '../../domain/valueObjects/Email'
import { Password } from '../../domain/valueObjects/Password'

export class AuthRepositoryImpl implements AuthRepository {
    constructor(private api: ApiService) { }

    async login(email: Email, password: Password): Promise<User> {
        try {
            const response = await this.api.post('/api/login', { email: email.value, password: password.value }, { withCredentials: true })

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Login failure')
            }

            const user = new User(
                response.data.data.user.id,
                response.data.data.user.name,
                response.data.data.user.email,
                response.data.data.user.status,
                response.data.data.user.role_id,
                response.data.data.user.specialization,
                response.data.data.user.photo,
            )

            return user
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const message = err.response?.data?.message || err.message || 'Login failed';
                throw new Error(message)
            } else {
                throw new Error('Unexpected error')
            }

        }
    }

    async user(): Promise<User> {
        const response = await this.api.get('/api/hpt/user')

        const user = new User(
            response.data.data.user.id,
            response.data.data.user.name,
            response.data.data.user.email,
            response.data.data.user.status,
            response.data.data.user.role_id,
            response.data.data.user.specialization_id,
            response.data.data.user.photo,
        )

        return user
    }

    async logout(): Promise<void> {
        await this.api.post('/api/hpt/logout')
    }

}