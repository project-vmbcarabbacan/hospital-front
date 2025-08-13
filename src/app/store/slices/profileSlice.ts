import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../domain/entities/User";
import { ID } from "../../../domain/valueObjects/ID";
import axios from "axios";
import { ApiError } from "../../../domain/entities/ApiError";
import { container } from "../../../di/container";
import { ProfileUseCase } from "../../usecases/Profile/ProfileUseCase";
import { TOKENS } from "../../../di/types";
import { BasicInformation, ProfileInformation } from "../../../presentation/components/utils/types";
import { Profile } from "../../../domain/entities/Profile";


interface ProfileState {
    profile_information: ProfileInformation | null
    basic_information: BasicInformation | null
}

const initialState: ProfileState = {
    profile_information: null,
    basic_information: null
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
                return rejectWithValue(err.response?.data?.message || err.message || 'Login failed');
            }
            return rejectWithValue('Unexpected login error');
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
            })
    }
})

export default profileSlice.reducer