import React from "react";
import { AppBar, Tab, Tabs, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { LabelValue } from "../../utils/types";

const StyledTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
        height: 4,
        borderRadius: 2,
        backgroundColor: theme.palette.background.paper,
    },
}));

const StyledTab = styled(Tab)<{ selectedtab?: string }>(({ theme, selectedtab }) => ({
    textTransform: 'none',
    fontWeight: selectedtab === 'true' ? 'bold' : 500,
    minWidth: 120,
    padding: '10px 16px',
    marginRight: theme.spacing(1),
    borderRadius: 8,
    transition: 'all 0.3s ease',
    backgroundColor: selectedtab === 'true'
        ? theme.palette.background.paper
        : 'transparent',
    border: selectedtab === 'true'
        ? `1px solid ${theme.palette.divider}`
        : '1px solid transparent',
    boxShadow: selectedtab === 'true'
        ? `inset 1px 1px 3px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(255, 255, 255, 0.1)`
        : 'none',
    '&:hover': {
        backgroundColor: selectedtab === 'true'
            ? theme.palette.background.paper
            : theme.palette.action.hover,
    },
}));


interface TabHeaderProps {
    value: number,
    tabs: LabelValue[]
    onChange: (value: number) => void
}

const TabHeader: React.FC<TabHeaderProps> = ({
    value,
    tabs,
    onChange
}) => {
    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        onChange(newValue);
    };

    const a11yProps = (index: number) => ({
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    });


    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <StyledTabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="styled tabs with emboss effect"
            >
                {tabs.map((tab, index) => (
                    <StyledTab
                        key={tab.value}
                        value={tab.value}
                        label={tab.label}
                        selectedtab={(value === tab.value).toString()}
                        {...a11yProps(index)}
                    />
                ))}
            </StyledTabs>
        </AppBar>
    );
};

export default TabHeader;
