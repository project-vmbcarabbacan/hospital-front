import { describe, it, expect } from 'vitest'
import { Password } from '../../../src/domain/valueObjects/Password'

describe('Password Value Object', () => {
    it('should create valid password', () => {
        const validPwd = 'Abcdef1@'
        const pwd = Password.create(validPwd)
        expect(pwd.value).toBe(validPwd)
        expect(pwd.toString()).toBe('[PROTECTED]')
    })

    it('should throw error for passwords that do not meet criteria', () => {
        // Too short
        expect(() => Password.create('A1@')).toThrow()

        // Missing letter
        expect(() => Password.create('12345678@')).toThrow()

        // Missing number
        expect(() => Password.create('Abcdefgh@')).toThrow()

        // Missing special char
        expect(() => Password.create('Abcdefg1')).toThrow()
    })

    it('should consider passwords equal only if exact match', () => {
        const pwd1 = Password.create('Abcdef1@')
        const pwd2 = Password.create('Abcdef1@')
        const pwd3 = Password.create('Xyz1234$')

        expect(pwd1.equals(pwd2)).toBe(true)
        expect(pwd1.equals(pwd3)).toBe(false)
    })
})
