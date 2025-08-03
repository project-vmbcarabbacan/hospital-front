import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthRepositoryImpl } from '../../../src/infrastructure/repositories/AuthRepositoryImpl'
import { ApiService } from '../../../src/infrastructure/api/ApiService'
import { Email } from '../../../src/domain/valueObjects/Email'
import { Password } from '../../../src/domain/valueObjects/Password'
import { User } from '../../../src/domain/entities/User'

describe('AuthRepositoryImpl', () => {
    let apiMock: ApiService
    let authRepo: AuthRepositoryImpl

    beforeEach(() => {
        apiMock = {
            post: vi.fn(),
            get: vi.fn(),
        } as unknown as ApiService

        authRepo = new AuthRepositoryImpl(apiMock)
    })

    it('should login and return a User instance', async () => {
        const email = new Email('test@example.com')
        const password = new Password('password123')

        const mockResponse = {
            status: 200,
            data: {
                data: {
                    user: {
                        id: 1,
                        name: 'John Doe',
                        email: 'test@example.com',
                        status: 'active',
                        role_id: 2,
                        specialization: 'cardiology',
                        photo: 'profile.jpg',
                    },
                },
            },
        }

        vi.spyOn(apiMock, 'post').mockResolvedValue(mockResponse)

        const user = await authRepo.login(email, password)

        expect(user).toBeInstanceOf(User)
        expect(user.email).toBe('test@example.com')
        expect(user.name).toBe('John Doe')
    })

    it('should throw an error on failed login', async () => {
        const email = new Email('fail@example.com')
        const password = new Password('wrongpassword')

        vi.spyOn(apiMock, 'post').mockRejectedValue({
            isAxiosError: true,
            response: { data: { message: 'Invalid credentials' } },
        })

        await expect(authRepo.login(email, password)).rejects.toThrow('Invalid credentials')
    })

    it('should return user from user()', async () => {
        const mockResponse = {
            data: {
                data: {
                    user: {
                        id: 2,
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        status: 'active',
                        role_id: 1,
                        specialization_id: 'dermatology',
                        photo: 'avatar.jpg',
                    },
                },
            },
        }

        vi.spyOn(apiMock, 'get').mockResolvedValue(mockResponse)

        const user = await authRepo.user()

        expect(user).toBeInstanceOf(User)
        expect(user.name).toBe('Jane Smith')
    })

    it('should call logout()', async () => {
        const postSpy = vi.spyOn(apiMock, 'post').mockResolvedValue({})

        await authRepo.logout()

        expect(postSpy).toHaveBeenCalledWith('/api/hpt/logout')
    })
})
