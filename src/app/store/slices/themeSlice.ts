import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThemeSettings } from '../../../core/theme/ThemeTypes';
import { defaultThemeSettings } from '../../../core/theme/DefaultTheme';
import { container } from '../../../di/container';
import { ThemeUseCase } from '../../usecases/Theme/ThemeUseCase';
import { TOKENS } from '../../../di/types';

interface ThemeState {
    settings: ThemeSettings;
    loading: boolean;
    error: string | null;
}

const initialState: ThemeState = {
    settings: defaultThemeSettings,
    loading: false,
    error: null,
};

export const loadTheme = createAsyncThunk(
    'theme/loadTheme',
    async () => {
        const themeUseCase = container.resolve<ThemeUseCase>(TOKENS.ThemeUseCase)
        const theme = await themeUseCase.execute()

        return theme
    }
);

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {
            state.settings = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTheme.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadTheme.fulfilled, (state, action) => {
                state.settings = action.payload;
                state.loading = false;
            })
            .addCase(loadTheme.rejected, (state, action) => {
                state.error = action.error.message ?? 'Failed to load theme';
                state.loading = false;
            });
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
