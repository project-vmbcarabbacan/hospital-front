import { describe, it, expect } from 'vitest'
import { UserLogin } from '../../../src/domain/entities/UserLogin'
import { UserLoginDTO, toEntity } from '../../../src/app/DTO/UserLoginDTO'

describe('UserLoginDTO toEntity', () => {
    it('should convert a valid UserLoginDTO to UserLogin entity', () => {
        const dto: UserLoginDTO = {
            email: 'test@example.com',
            password: 'password123!',
        }

        const entity = toEntity(dto)

        expect(entity).toBeInstanceOf(UserLogin)
        expect(entity.email).toBe(dto.email)
        expect(entity.password).toBe(dto.password)
    })
})
