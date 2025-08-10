import { Box } from "@mui/material";
import React from "react";

interface TabPanelProps {
    value: number;
    index: number;
    children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
    value,
    index,
    children
}) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>

    )
}

export default TabPanel