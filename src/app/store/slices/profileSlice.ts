import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ID } from "../../../domain/valueObjects/ID";
import axios from "axios";
import { ApiError } from "../../../domain/entities/ApiError";
import { container } from "../../../di/container";
import { ProfileUseCase } from "../../usecases/Profile/ProfileUseCase";
import { TOKENS } from "../../../di/types";
import { BasicInformation, ProfileInformation, UpdateByField } from "../../../presentation/components/utils/types";
import { Profile } from "../../../domain/entities/Profile";
import { ProfileUpdateUseCase } from "../../usecases/Profile/ProfileUpdateUseCase";


interface ProfileState {
    profile_information: ProfileInformation | null
    basic_information: BasicInformation | null
    bio: string | null
}

const initialState: ProfileState = {
    profile_information: null,
    basic_information: null,
    bio: null
}

export const getProfileById = createAsyncThunk(
    'profile/get',
    async (id: ID, { rejectWithValue }) => {
        try {

            const profileUsecase = container.resolve<ProfileUseCase>(TOKENS.ProfileUseCase)
            const profile = await profileUsecase.execute(id)
            return profile.toJSON();

        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                return rejectWithValue(err.response?.data?.message || err.message || 'Profile failed');
            }
            return rejectWithValue('Unexpected profile error');
        }
    }
)

export const updateInformation = createAsyncThunk(
    'profile/update',
    async (form: UpdateByField, { rejectWithValue }) => {
        try {
            const profileUpdateUseCase = container.resolve<ProfileUpdateUseCase>(TOKENS.ProfileUpdateUseCase);
            await profileUpdateUseCase.execute(form)
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                return rejectWithValue(err.response?.data?.message || err.message || 'Update profile failed');
            }
            return rejectWithValue('Unexpected profile update error');
        }
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getProfileById.fulfilled, (state: ProfileState, actions: PayloadAction<Profile>) => {
                state.profile_information = actions.payload.profile_information
                state.basic_information = actions.payload.basic_information
                state.bio = actions.payload.bio
            })
    }
})

export default profileSlice.reducer