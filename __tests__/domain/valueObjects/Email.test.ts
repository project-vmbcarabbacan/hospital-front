import { describe, it, expect } from 'vitest'
import { Email } from '../../../src/domain/valueObjects/Email'

describe('Email Value Object', () => {
    it('should create Email instance with valid email', () => {
        const emailStr = 'test@example.com'
        const email = Email.create(emailStr)
        expect(email).toBeInstanceOf(Email)
        expect(email.value).toBe(emailStr)
    })

    it('should throw error for invalid email format', () => {
        expect(() => Email.create('invalid-email')).toThrow('Invalid email format')
        expect(() => Email.create('')).toThrow('Invalid email format')
        expect(() => Email.create('no-at-sign.com')).toThrow('Invalid email format')
    })

    it('should consider emails equal regardless of case', () => {
        const email1 = Email.create('Test@Example.com')
        const email2 = Email.create('test@example.com')
        expect(email1.equals(email2)).toBe(true)
    })

    it('should return the email string on toString()', () => {
        const emailStr = 'user@domain.com'
        const email = Email.create(emailStr)
        expect(email.toString()).toBe(emailStr)
    })
})
