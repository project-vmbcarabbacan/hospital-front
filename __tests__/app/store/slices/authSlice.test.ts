import { describe, it, expect } from 'vitest'
import authReducer, { loginWithSession, currentUser, logout } from '../../../../src/app/store/slices/authSlice'
import { User } from '../../../../src/domain/entities/User'

describe('authSlice reducer', () => {
    const initialState = {
        is_auth: false,
        is_loading: false,
        is_rendered: false,
        user: null,
    }

    const fakeUser = new User(1, 'John Doe', 'john@example.com', 'active', 2, 3)

    it('should handle initial state', () => {
        expect(authReducer(undefined, { type: '' })).toEqual(initialState)
    })

    // loginWithSession
    it('should handle loginWithSession.pending', () => {
        const action = { type: loginWithSession.pending.type }
        const state = authReducer(initialState, action)
        expect(state.is_loading).toBe(true)
        expect(state.is_auth).toBe(false)
    })

    it('should handle loginWithSession.fulfilled', () => {
        const action = { type: loginWithSession.fulfilled.type, payload: fakeUser.toJSON() }
        const state = authReducer(initialState, action)
        expect(state.is_auth).toBe(true)
        expect(state.is_loading).toBe(false)
        expect(state.user).toEqual(fakeUser.toJSON())
    })

    it('should handle loginWithSession.rejected', () => {
        const action = { type: loginWithSession.rejected.type }
        const state = authReducer(initialState, action)
        expect(state.is_auth).toBe(false)
        expect(state.is_loading).toBe(false)
        expect(state.user).toBeNull()
    })

    // currentUser
    it('should handle currentUser.pending', () => {
        const action = { type: currentUser.pending.type }
        const state = authReducer(initialState, action)
        expect(state.is_auth).toBe(false)
        expect(state.is_rendered).toBe(false)
    })

    it('should handle currentUser.fulfilled', () => {
        const action = { type: currentUser.fulfilled.type, payload: fakeUser.toJSON() }
        const state = authReducer(initialState, action)
        expect(state.is_auth).toBe(true)
        expect(state.is_rendered).toBe(true)
        expect(state.user).toEqual(fakeUser.toJSON())
    })

    it('should handle currentUser.rejected', () => {
        const action = { type: currentUser.rejected.type }
        const state = authReducer(initialState, action)
        expect(state.is_auth).toBe(false)
        expect(state.is_rendered).toBe(true)
        expect(state.user).toBeNull()
    })

    // logout
    it('should handle logout.fulfilled', () => {
        const loggedInState = {
            is_auth: true,
            is_loading: false,
            is_rendered: true,
            user: fakeUser.toJSON(),
        }
        const action = { type: logout.fulfilled.type }
        const state = authReducer(loggedInState, action)
        expect(state.is_auth).toBe(false)
        expect(state.is_loading).toBe(false)
        expect(state.user).toBeNull()
    })
})
