import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import themeReducer from './slices/themeSlice'
import profileReducer from './slices/profileSlice'
import scheduleReducer from './slices/scheduleSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    schedule: scheduleReducer,
    theme: themeReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch