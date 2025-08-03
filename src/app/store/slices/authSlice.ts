import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { container } from '../../../di/container'
import { TOKENS } from '../../../di/types';
import { LoginUseCase } from '../../usecases/Auth/LoginUseCase';
import { LoggedInUserUseCase } from '../../usecases/Auth/LoggedInUserUseCase';
import { LogoutUseCase } from '../../usecases/Auth/LogoutUseCase';
import { User } from '../../../domain/entities/User';
import axios from 'axios';
import { ApiError } from '../../../domain/entities/ApiError';
import { UserLoginDTO } from '../../DTO/UserLoginDTO';

interface AuthState {
  is_auth: boolean
  is_loading: boolean
  is_rendered: boolean
  user: ReturnType<User['toJSON']> | null
}

const initialState: AuthState = {
  is_auth: false,
  is_loading: false,
  is_rendered: false,
  user: null,
}


export const loginWithSession = createAsyncThunk(
  'auth/login',
  async (credential: UserLoginDTO, { rejectWithValue }) => {
    try {
      const loginUseCase = container.resolve<LoginUseCase>(TOKENS.LoginUseCase);
      const user = await loginUseCase.execute(credential);
      return user.toJSON();
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiError>(err)) {
        return rejectWithValue(err.response?.data?.message || err.message || 'Login failed');
      }
      return rejectWithValue('Unexpected login error');
    }
  }
);

export const currentUser = createAsyncThunk('auth/current',
  async () => {
    const loggedInUserUseCase = container.resolve<LoggedInUserUseCase>(TOKENS.LoggedInUserUseCase);

    const user = await loggedInUserUseCase.execute()
    return user.toJSON();

  }
)

export const logout = createAsyncThunk('auth/logout',
  async () => {
    const logoutUseCase = container.resolve<LogoutUseCase>(TOKENS.LogoutUseCase)

    await logoutUseCase.execute()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /* login */
      .addCase(loginWithSession.pending, state => {
        state.is_auth = false
        state.is_loading = true
      })
      .addCase(loginWithSession.fulfilled, (state: AuthState, actions: PayloadAction<User>) => {
        state.is_auth = true
        state.is_loading = false
        state.user = actions.payload

      })
      .addCase(loginWithSession.rejected, state => {
        state.is_auth = false
        state.is_loading = false
        state.user = null
      })

      /* current user */
      .addCase(currentUser.pending, state => {
        state.is_auth = false
        state.is_rendered = false
      })
      .addCase(currentUser.fulfilled, (state: AuthState, actions: PayloadAction<User>) => {
        state.is_auth = true
        state.is_rendered = true
        state.user = actions.payload

      })
      .addCase(currentUser.rejected, state => {
        state.is_auth = false
        state.is_rendered = true
        state.user = null
      })

      /* logout */
      .addCase(logout.fulfilled, state => {
        state.is_auth = false
        state.is_loading = false
        state.user = null

      })
  }
})

export default authSlice.reducer
