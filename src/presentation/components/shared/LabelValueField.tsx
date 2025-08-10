import { Box, Typography } from "@mui/material";
import React from "react";
import { LabelValue } from "../utils/types";


const LabelValueField: React.FC<LabelValue> = ({
    label, value
}) => {
    return (
        <Box
            sx={{
                display: "flex", gap: 1,
                alignItems: "end",
                m: 1
            }}
        >
            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontWeight: 300, fontSize: 14 }}
            >
                {label}
            </Typography>
            <Typography
                variant="body2"
                sx={{ fontWeight: 500, fontSize: 14 }}
            >
                {value}
            </Typography>
        </Box>
    )
}

export default LabelValueField