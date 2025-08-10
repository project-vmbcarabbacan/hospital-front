import React from 'react';
import {
    Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Toolbar, Box, useTheme, useMediaQuery, Collapse
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Person as PersonIcon,
    BarChart as BarChartIcon,
    EventNote as EventNoteIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/store/hooks';
import { logout } from '../../app/store/slices/authSlice';

interface SidebarProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle, drawerWidth }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'lg'));
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

    const toggleSubMenu = (menu: string) => {
        setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    const navItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
        { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
        { text: 'Schedule', icon: <EventNoteIcon />, path: '/schedules' },
        { text: 'Users', icon: <PeopleIcon />, path: '/users' },
        {
            text: 'Reports',
            icon: <BarChartIcon />,
            children: [
                { text: 'Monthly', path: '/reports/monthly' },
                { text: 'Annual', path: '/reports/annual' },
            ],
        },
    ];

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    };


    const getNavItemStyles = (
        isActive: boolean,
        theme: any
    ): React.CSSProperties => ({
        textDecoration: 'none',
        color: isActive ? theme.palette.text.tertiary : theme.palette.text.primary,
        backgroundColor: isActive ? theme.palette.secondary.dark : 'transparent',
        fontWeight: isActive ? 'bold' : 'normal',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        zIndex: 1,
    });


    const drawer = (
        <>
            {isMobile ? (<Toolbar />) : ''}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
                <List sx={{ flexGrow: 1 }}>
                    {navItems.map(({ text, icon, path, children }) => {
                        const isOpen = openMenus[text];

                        if (children) {
                            return (
                                <React.Fragment key={text}>
                                    <Box
                                        sx={{
                                            textDecoration: 'none',
                                            color: theme.palette.secondary.contrastText,
                                            fontWeight: 'normal',
                                            borderRadius: '8px',
                                            transition: 'all 0.2s ease-in-out',
                                            position: 'relative',
                                        }}
                                    >
                                        <ListItemButton onClick={() => toggleSubMenu(text)}>
                                            <ListItemIcon>{icon}</ListItemIcon>
                                            <ListItemText primary={text} />
                                            {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        </ListItemButton>
                                    </Box>
                                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {children.map((child) => (
                                                <NavLink
                                                    to={child.path}
                                                    key={child.text}
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    {({ isActive }) => (
                                                        <Box
                                                            sx={{
                                                                ...getNavItemStyles(isActive, theme),
                                                                ml: 2, // indent children
                                                                '&::before': isActive
                                                                    ? {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        left: 0,
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        width: '4px',
                                                                        height: '60%',
                                                                        backgroundColor: theme.palette.secondary.contrastText,
                                                                        borderRadius: '0 4px 4px 0',
                                                                    }
                                                                    : {},
                                                                '&::after': isActive && !isMobile
                                                                    ? {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        right: 0,
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        width: 0,
                                                                        height: 0,
                                                                        borderTop: '8px solid transparent',
                                                                        borderBottom: '8px solid transparent',
                                                                        borderRight: `10px solid ${theme.palette.background.default}`,
                                                                    }
                                                                    : {},
                                                            }}
                                                        >
                                                            <ListItemButton
                                                                sx={{ pl: 4 }}
                                                                onClick={isMobile ? handleDrawerToggle : undefined}
                                                            >
                                                                <ListItemText primary={child.text} />
                                                            </ListItemButton>
                                                        </Box>
                                                    )}
                                                </NavLink>
                                            ))}
                                        </List>
                                    </Collapse>
                                </React.Fragment>
                            );
                        }

                        return (
                            <NavLink
                                to={path!}
                                key={text}
                                style={{ textDecoration: 'none' }}
                            >
                                {({ isActive }) => (
                                    <Box
                                        sx={{
                                            ...getNavItemStyles(isActive, theme),
                                            mx: 1, // small horizontal margin for spacing
                                            overflow: 'visible', // ensure arrow is visible
                                            position: 'relative',
                                            m: 0, // 🔹 remove external margin
                                            p: 0, // 🔹 remove internal padding
                                            '&::before': isActive
                                                ? {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: '4px',
                                                    height: '60%',
                                                    backgroundColor: theme.palette.secondary.contrastText,
                                                    borderRadius: '0 4px 4px 0',
                                                }
                                                : {},
                                            '&::after': isActive && !isMobile
                                                ? {
                                                    content: '""',
                                                    position: 'absolute',
                                                    right: 0,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    width: 0,
                                                    height: 0,
                                                    borderTop: '8px solid transparent',
                                                    borderBottom: '8px solid transparent',
                                                    borderRight: `10px solid ${theme.palette.background.default}`,
                                                }
                                                : {},
                                        }}
                                    >
                                        <ListItemButton
                                            onClick={isMobile ? handleDrawerToggle : undefined}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    color: isActive ? theme.palette.text.tertiary : theme.palette.text.primary,
                                                }}
                                            >{icon}</ListItemIcon>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </Box>
                                )}
                            </NavLink>
                        );
                    })}
                </List>

                <Box sx={{ marginTop: 'auto' }}>
                    <NavLink
                        to="/settings"
                        style={{ textDecoration: 'none' }}
                    >
                        {({ isActive }) => (
                            <Box
                                sx={{
                                    ...getNavItemStyles(isActive, theme),
                                    '&::before': isActive
                                        ? {
                                            content: '""',
                                            position: 'absolute',
                                            left: 0,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            width: '4px',
                                            height: '60%',
                                            backgroundColor: theme.palette.secondary.contrastText,
                                            borderRadius: '0 4px 4px 0',
                                        }
                                        : {},
                                    '&::after': isActive && !isMobile
                                        ? {
                                            content: '""',
                                            position: 'absolute',
                                            right: 0,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            width: 0,
                                            height: 0,
                                            borderTop: '8px solid transparent',
                                            borderBottom: '8px solid transparent',
                                            borderRight: `10px solid ${theme.palette.background.default}`,
                                        }
                                        : {},
                                }}
                            >
                                <ListItemButton
                                    onClick={isMobile ? handleDrawerToggle : undefined}
                                >
                                    <ListItemIcon
                                        sx={{
                                            color: isActive ? theme.palette.text.tertiary : theme.palette.text.primary,
                                        }}
                                    ><SettingsIcon /></ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                            </Box>
                        )}
                    </NavLink>
                    <Box onClick={handleLogout} sx={{ cursor: 'pointer' }}>
                        <ListItemButton onClick={isMobile ? handleDrawerToggle : undefined}>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </Box>
                </Box>
            </Box>
        </>
    );

    return (
        <Box component="nav" sx={{
            width: { lg: drawerWidth },
            flexShrink: { lg: 0 },
            backgroundColor: theme.palette.background.default,
        }}>
            {isMobile ? (
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        zIndex: (theme) => theme.zIndex.appBar + 1,
                        display: { md: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: 'none',
                            backgroundColor: theme.palette.secondary.light,
                            borderTopRightRadius: 16,
                            borderBottomRightRadius: 16
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            )}
        </Box>
    );
};

export default Sidebar;
