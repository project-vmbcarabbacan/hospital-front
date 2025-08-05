import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, useTheme } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import TopBar from '../layouts/TopBar';
import Sidebar from '../layouts/Sidebar';
import Dashboard from './Dashboard';
import Users from './Users';
import Reports from './Reports';
import Settings from './Settings';
import Profile from './Profile';


const drawerWidth = 240;

const App: React.FC = () => {
    const theme = useTheme();


    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prev) => !prev);
    };

    return (

        <Box sx={{ display: 'flex', backgroundColor: theme.palette.background.default, height: '100vh' }}>
            <CssBaseline />
            <TopBar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={drawerWidth}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    backgroundColor: theme.palette.background.default,  // White Background
                    height: '100vh',  // Full Height for the content area
                    borderRadius: 1,  // Optional: rounded corners
                    overflowY: 'auto',  // Ensures scrollable content
                }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default App;