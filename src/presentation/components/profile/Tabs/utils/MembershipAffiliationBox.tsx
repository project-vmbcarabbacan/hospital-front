import React from "react";
import {
    Box,
    Paper,
    Typography,
    Stack,
    Chip,
    Divider,
} from "@mui/material";

interface MembershipBoxProps {
    id: number;
    organizationName: string;
    type: "Membership" | "Affiliation";
    roleDesignation: string;
    startDate: string;
    endDate?: string | null;
    membershipNo?: string | null;
    country: string;
    status: "Active" | "Inactive" | "Expired";
    notes?: string;
    onClick?: (id: number) => void;
}

const MembershipAffiliationBox: React.FC<MembershipBoxProps> = ({
    id,
    organizationName,
    type,
    roleDesignation,
    startDate,
    endDate,
    membershipNo,
    country,
    status,
    notes,
    onClick,
}) => {
    const handleClick = () => {
        onClick?.(id);
    };

    const statusColor =
        status === "Active" ? "success" : status === "Expired" ? "warning" : "default";

    return (
        <Box
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClick();
            }}
            sx={{
                px: 2,
                py: 1,
                outline: "none",
                cursor: "pointer",
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            {organizationName}
                        </Typography>
                        <Chip label={status} color={statusColor} size="small" />
                    </Stack>

                    <Typography variant="subtitle2" color="text.secondary">
                        {type} — {roleDesignation}
                    </Typography>

                    <Typography variant="body2">
                        {startDate} to {endDate || "Present"}
                    </Typography>

                    {membershipNo && (
                        <Typography variant="body2" color="text.secondary">
                            <strong>Membership No:</strong> {membershipNo}
                        </Typography>
                    )}

                    <Typography variant="body2" color="text.secondary">
                        <strong>Country:</strong> {country}
                    </Typography>

                    {notes && (
                        <>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                                <strong>Notes:</strong> {notes}
                            </Typography>
                        </>
                    )}
                </Stack>
            </Paper>
        </Box>
    );
};

export default MembershipAffiliationBox;
