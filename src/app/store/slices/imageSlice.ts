import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiError } from '../../../domain/entities/ApiError';
import { container } from "../../../di/container";
import { UploadProfileUseCase } from '../../usecases/Image/UploadProfileUseCase';
import { TOKENS } from '../../../di/types';

interface ImageState {
    loading: boolean
}

const initialState: ImageState = {
    loading: false
}
export const uploadAvatar = createAsyncThunk(
    'avatar/upload',
    async (form: FormData, { rejectWithValue }) => {
        try {
            const uploadProfile = container.resolve<UploadProfileUseCase>(TOKENS.UploadProfileUseCase)
            await uploadProfile.execute(form)
        } catch (err) {
            if (axios.isAxiosError<ApiError>(err)) {
                return rejectWithValue(err.response?.data?.message || err.message || 'Upload avatar failed');
            }
            return rejectWithValue('Unexpected avatar upload error');
        }
    }
);

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadAvatar.pending, state => {
                state.loading = true;
            })
            .addCase(uploadAvatar.fulfilled, state => {
                state.loading = false;
            })
            .addCase(uploadAvatar.rejected, state => {
                state.loading = false;
            });
    },
});

export default imageSlice.reducer;