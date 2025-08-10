import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Stack,
    Paper,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UploadedDocument {
    id: string;
    name: string;
    size: number;
    type: string;
    status: "Uploaded" | "Pending";
}

interface DocumentUploadBoxProps {
    onUpload?: (file: File) => void;
    onDelete?: (id: string) => void;
    initialDocuments?: UploadedDocument[];
    allowMultiple?: boolean;
}

const DocumentUploadBox: React.FC<DocumentUploadBoxProps> = ({
    onUpload,
    onDelete,
    initialDocuments = [],
    allowMultiple = true,
}) => {
    const [documents, setDocuments] = useState<UploadedDocument[]>(initialDocuments);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const uploaded = Array.from(files).map((file) => {
            const doc: UploadedDocument = {
                id: crypto.randomUUID(),
                name: file.name,
                size: file.size,
                type: file.type,
                status: "Pending",
            };
            onUpload?.(file); // trigger parent upload function
            return doc;
        });

        setDocuments((prev) => [...prev, ...uploaded]);

        // Clear file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleDelete = (id: string) => {
        setDocuments((prev) => prev.filter((doc) => doc.id !== id));
        onDelete?.(id);
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 2 }} elevation={2}>
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight="bold">
                    Document Uploads
                </Typography>

                <Box>
                    <input
                        ref={fileInputRef}
                        type="file"
                        hidden
                        multiple={allowMultiple}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Upload Document
                    </Button>
                </Box>

                <List dense>
                    {documents.map((doc) => (
                        <ListItem key={doc.id} divider>
                            <ListItemText
                                primary={doc.name}
                                secondary={`${(doc.size / 1024).toFixed(1)} KB • ${doc.type}`}
                            />
                            <Chip
                                label={doc.status}
                                color={doc.status === "Uploaded" ? "success" : "warning"}
                                size="small"
                                sx={{ mr: 2 }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleDelete(doc.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Stack>
        </Paper>
    );
};

export default DocumentUploadBox;
