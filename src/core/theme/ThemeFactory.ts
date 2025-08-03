import { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import { ThemeSettings } from './ThemeTypes';

export const createMuiThemeFromSettings = (settings: ThemeSettings): Theme => {
    return createTheme({
        palette: {
            primary: {
                main: settings.primaryMainColor,
                contrastText: settings.primaryContrastColor,
            },
            secondary: {
                main: settings.secondaryMainColor,
                light: settings.sidebarBackgroundColor,
                dark: settings.sidebarHoverColor,
                contrastText: settings.sidebarTextColor,
            },
            background: {
                default: settings.backgroundDefaultColor,
                paper: settings.backgroundPaperColor,
                main: settings.mainBackgroundColor,
                card: settings.cardBorderColor
            },
            text: {
                primary: settings.textPrimaryColor,
                secondary: settings.textSecondaryColor,
                tertiary: settings.sidebarHoverTextColor
            },
            success: {
                main: settings.successColor,
            },
            warning: {
                main: settings.warningColor,
            },
            error: {
                main: settings.errorColor,
            }
        },
    });
};
