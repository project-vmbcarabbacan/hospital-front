import { RootState } from "../store";

export const selectThemeSettings = (state: RootState) => state.theme.settings
export const selectThemeLoading = (state: RootState) => state.theme.loading;