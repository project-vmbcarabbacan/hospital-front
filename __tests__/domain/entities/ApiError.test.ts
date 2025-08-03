import { describe, it, expect } from 'vitest'
import { ApiError } from '../../../src/domain/entities/ApiError'

describe('ApiError Entity', () => {
    it('should create an ApiError instance with message and statusCode', () => {
        const error = new ApiError('Not Found', 404)

        expect(error.message).toBe('Not Found')
        expect(error.statusCode).toBe(404)
    })
})
