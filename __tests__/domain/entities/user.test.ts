import { describe, it, expect } from 'vitest'
import { User } from '../../../src/domain/entities/User'

describe('User Entity', () => {
    it('should create a User instance with all properties', () => {
        const user = new User(
            1,
            'John Doe',
            'john@example.com',
            'active',
            2,
            10,
            'photo.jpg',
            'secret'
        )

        expect(user.id).toBe(1)
        expect(user.name).toBe('John Doe')
        expect(user.email).toBe('john@example.com')
        expect(user.status).toBe('active')
        expect(user.role_id).toBe(2)
        expect(user.specialization_id).toBe(10)
        expect(user.photo).toBe('photo.jpg')
        expect(user.password).toBe('secret')
    })

    it('should output correct JSON without password', () => {
        const user = new User(
            5,
            'Jane Smith',
            'jane@example.com',
            'inactive',
            3,
            7,
            undefined,
            'mypassword'
        )

        const json = user.toJSON()

        expect(json).toEqual({
            id: 5,
            name: 'Jane Smith',
            email: 'jane@example.com',
            status: 'inactive',
            role_id: 3,
            specialization_id: 7,
            photo: undefined,
        })

        // password should not be in JSON output
        expect(json).not.toHaveProperty('password')
    })
})
