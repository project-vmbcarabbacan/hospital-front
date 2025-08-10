import React from "react";
import { Box, Paper, Typography, Stack, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface QualificationBoxProps {
    id: number;
    qualification: string;
    specialization: string;
    institution: string;
    country: string;
    startDate: string;
    endDate: string;
    licenseNo: string;
    issuingAuthority: string;
    additionalCertifications: string; // or string if comma-separated
    verified: boolean;
    notes?: string;
    onClick?: (id: number) => void;
}

const EducationAchievementBox: React.FC<QualificationBoxProps> = ({
    id,
    qualification,
    specialization,
    institution,
    country,
    startDate,
    endDate,
    licenseNo,
    issuingAuthority,
    additionalCertifications,
    verified,
    notes,
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
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h6" fontWeight="bold" color="primary.main">
                            {qualification} - {specialization}
                        </Typography>
                        <Chip
                            label={verified ? "Verified" : "Unverified"}
                            color={verified ? "success" : "error"}
                            icon={verified ? <CheckCircleIcon /> : <CancelIcon />}
                            size="small"
                        />
                    </Stack>

                    <Typography variant="subtitle2" color="text.secondary">
                        {institution}, {country}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {startDate} to {endDate}
                    </Typography>

                    <Typography variant="body2">
                        <strong>License:</strong> {licenseNo} ({issuingAuthority})
                    </Typography>

                    {additionalCertifications?.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {additionalCertifications.split(',').map((cert, index) => (
                                <Chip
                                    key={index}
                                    label={cert}
                                    variant="outlined"
                                    size="small"
                                    sx={{ mt: 1 }}
                                />
                            ))}
                        </Stack>
                    )}

                    {notes && (
                        <Typography variant="body2" color="text.secondary">
                            <strong>Notes:</strong> {notes}
                        </Typography>
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default EducationAchievementBox;
