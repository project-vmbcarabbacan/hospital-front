import { describe, it, expect } from 'vitest'
import { ID } from '../../../src/domain/valueObjects/ID'

describe('ID Value Object', () => {
    it('should create valid numeric ID', () => {
        const id = ID.create(123)
        expect(id.value).toBe(123)
        expect(id.toString()).toBe('123')
    })

    it('should throw error for invalid numeric ID', () => {
        expect(() => ID.create(0)).toThrow('Invalid ID: 0')
        expect(() => ID.create(-5)).toThrow('Invalid ID: -5')
        expect(() => ID.create(3.14)).toThrow('Invalid ID: 3.14')
    })

    it('should create valid UUID v4 string ID', () => {
        const validUUID = '550e8400-e29b-41d4-a716-446655440000'
        const id = ID.create(validUUID)
        expect(id.value).toBe(validUUID)
        expect(id.toString()).toBe(validUUID)
    })

    it('should throw error for invalid UUID string', () => {
        expect(() => ID.create('invalid-uuid')).toThrow('Invalid ID: invalid-uuid')
        expect(() => ID.create('550e8400-e29b-41d4-a716-44665544000Z')).toThrow() // invalid char
        expect(() => ID.create('')).toThrow('Invalid ID: ')
    })

    it('should check equality correctly', () => {
        const id1 = ID.create(123)
        const id2 = ID.create(123)
        const id3 = ID.create('550e8400-e29b-41d4-a716-446655440000')
        const id4 = ID.create('550e8400-e29b-41d4-a716-446655440000')
        const id5 = ID.create(456)

        expect(id1.equals(id2)).toBe(true)
        expect(id3.equals(id4)).toBe(true)
        expect(id1.equals(id5)).toBe(false)
        expect(id1.equals(id3)).toBe(false)
    })
})
