import { Box, Paper } from "@mui/material";
import React from "react";
import AddIcon from '@mui/icons-material/Add';

interface AddCardProp {
    onClick: () => void;
}

const AddCard: React.FC<AddCardProp> = ({ onClick }) => {
    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                px: 2,
                cursor: 'pointer',
                py: 1
            }}
            onClick={onClick}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: "15px",
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
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
                <AddIcon fontSize="large" />
            </Paper>
        </Box>
    );
};

export default AddCard;
