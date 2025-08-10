import React from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";

interface AchievementBoxProps {
    id: number;
    title: string;
    description: string;
    year_awarded: string;
    onClick?: (id: number) => void;
}

const AchievementBox: React.FC<AchievementBoxProps> = ({
    id,
    title,
    description,
    year_awarded,
    onClick,
}) => {
    const handleClick = () => {
        onClick?.(id);
    };

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClick();
            }}
            sx={{
                width: "100%",
                display: "block",
                px: 2,
                py: 1,
                cursor: "pointer",
                outline: "none",
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                        boxShadow: 6,
                        transform: "translateY(-4px)",
                    },
                    "&:focus-within": {
                        border: "2px solid",
                        borderColor: "primary.main",
                    },
                }}
            >
                <Stack spacing={1}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary.main"
                        sx={{ wordWrap: "break-word" }}
                    >
                        {title}
                    </Typography>

                    <Typography variant="subtitle2" color="text.secondary">
                        Awarded: {year_awarded}
                    </Typography>

                    <Typography variant="body2" color="text.primary">
                        {description}
                    </Typography>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AchievementBox;
