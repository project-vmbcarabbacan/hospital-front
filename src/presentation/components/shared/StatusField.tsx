import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

interface StatusInterface {
    text: string
}

const StatusField: React.FC<StatusInterface> = ({
    text
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

    let bgColor = "";
    let color = "";

    switch (text) {
        case "Active":
            bgColor = "#C8E6C9";
            color = "#2E7D32";
            break;
        case "On Leave":
            bgColor = "#E3F2FD";
            color = "#1976D2";
            break;
        case "Resigned":
            bgColor = "#FFCDD2";
            color = "#C62828";
            break;
        case "Retired":
            bgColor = "#FFE0B2";
            color = "#EF6C00";
            break;
        case "Suspended":
            bgColor = "#FFF9C4";
            color = "#FBC02D";
            break;
        default:
            bgColor = "#E0E0E0";
            color = "#424242";
            break;
    }

    return (
        <Box
            sx={{
                backgroundColor: bgColor,
                color: color,
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: "0.875rem",
                width: isMobile ? "35%" : "100%",
                textAlign: isMobile ? 'center' : 'start',
                justifySelf: isMobile ? 'center' : 'start'
            }}
        >
            <Typography
                textAlign={'center'}
            >
                {text}
            </Typography>
        </Box>
    )
}

export default StatusField;