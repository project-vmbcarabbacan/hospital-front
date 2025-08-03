import { ThemeSettings } from "../../core/theme/ThemeTypes";

export interface ThemeRepository {
    fetchThemeSettings(): Promise<ThemeSettings>
}