// src/components/TopBar.tsx
import React from 'react';
import {
    AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface TopBarProps {
    handleDrawerToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ handleDrawerToggle }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!isMobile) return null

    return (
        /* sx={{ zIndex: (theme) => theme.zIndex.drawer }} */
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Hospital
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
