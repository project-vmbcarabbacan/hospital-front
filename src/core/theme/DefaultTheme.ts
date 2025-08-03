import { ThemeSettings } from "./ThemeTypes";

export const defaultThemeSettings: ThemeSettings = {
    primaryMainColor: '#60a5fa',          // Soft Sky Blue
    primaryContrastColor: '#ffffff',
    secondaryMainColor: '#f4ede4',        // Warm Sand accent
    backgroundDefaultColor: '#f8f8f8',    // Soft Cyan
    backgroundPaperColor: '#ffffff',      // For content/cards
    textPrimaryColor: '#1e293b',          // Deep Charcoal
    textSecondaryColor: '#64748b',        // Slate Gray
    successColor: '#34d399',              // Emerald
    warningColor: '#facc15',              // Amber
    errorColor: '#f87171',                // Coral

    // Sidebar-specific
    sidebarBackgroundColor: '#ffffff',
    sidebarTextColor: '#1e293b',
    sidebarHoverColor: '#494d52ff',
    sidebarHoverTextColor: '#ffffff',

    // Optional
    mainBackgroundColor: '#ffffff',
    cardBorderColor: '#e2e8f0',
}