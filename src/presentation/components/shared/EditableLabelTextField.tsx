import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    IconButton,
    TextField,
    MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LabelValue } from "../utils/types";

interface EditableFieldProps {
    label: string;
    value: string | number;
    onChange?: (newValue: string) => void;
    type?: "text" | "select" | "date";
    isEditable?: boolean
    option?: LabelValue[];
}

const EditableLabelTextField: React.FC<EditableFieldProps> = ({
    label,
    value,
    onChange,
    type = "text",
    isEditable = true,
    option = [],
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    const [localDate, setLocalDate] = useState<Dayjs | null>(
        type === "date" && value ? dayjs(value) : null
    );

    useEffect(() => {
        // Sync local state with parent value when not editing
        if (!isEditing) {
            setLocalValue(value);
            if (type === "date") {
                setLocalDate(value ? dayjs(value) : null);
            }
        }
    }, [value, isEditing, type]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleDoneClick = () => {
        setIsEditing(false);
        if (type === "date" && localDate) {
            onChange(dayjs(localDate).format('YYYY-MM-DD'));
        } else {
            onChange(localValue);
        }
    };

    let content: React.ReactNode;

    switch (type) {
        case "select":
            content = (
                <>
                    <TextField
                        select
                        fullWidth
                        size="small"
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        sx={{ flexGrow: 1, mr: 1 }}
                    >
                        {option.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <IconButton size="small" onClick={handleDoneClick}>
                        <DoneIcon fontSize="small" />
                    </IconButton>
                </>
            );
            break;

        case "date":
            content = (
                <>
                    <DatePicker
                        value={localDate}
                        onChange={(newValue) => setLocalDate(newValue)}
                        format="MMM DD, YYYY"
                        sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <IconButton size="small" onClick={handleDoneClick}>
                        <DoneIcon fontSize="small" />
                    </IconButton>
                </>
            );
            break;

        case "text":
        default:
            content = (
                <>
                    <TextField
                        fullWidth
                        size="small"
                        value={localValue}
                        onChange={(e) => setLocalValue(e.target.value)}
                        sx={{ flexGrow: 1, mr: 1 }}
                    />
                    <IconButton size="small" onClick={handleDoneClick}>
                        <DoneIcon fontSize="small" />
                    </IconButton>
                </>
            );
    }

    return (
        <Box>
            <Typography
                variant="subtitle2"
                color="text.secondary"

            >
                {label}
            </Typography>

            <Box
                display="flex"
                alignItems="center"
                sx={{
                    position: "relative",
                    "&:hover .edit-icon": {
                        opacity: 1,
                    },
                }}
            >
                {isEditing && isEditable ? (
                    content
                ) : (
                    <>
                        <Typography
                            variant="body1"
                            sx={{ flexGrow: 1, mr: 1, fontWeight: 500, fontSize: 16, mb: 2 }}
                            onClick={handleEditClick}
                        >
                            {type === "date" && value ? dayjs(value).format("MMM DD, YYYY") : value}
                        </Typography>
                        {isEditable ?
                            (<IconButton
                                size="small"
                                onClick={handleEditClick}
                                className="edit-icon"
                                sx={{
                                    opacity: 0,
                                    transition: "opacity 0.3s ease-in-out",
                                }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>) :
                            ('')
                        }

                    </>
                )}
            </Box>
        </Box>
    );
};

export default EditableLabelTextField;
