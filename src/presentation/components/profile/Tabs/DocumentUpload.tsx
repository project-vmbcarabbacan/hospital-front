import React from "react";
import TabPanel from "./TabPanel";
import { Value } from "../../utils/types";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import DocumentUploadBox from "./utils/DocumentUploadBox";

const DocumentUploadTab: React.FC<Value> = ({
    value
}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'lg'));

    return (
        <TabPanel value={6} index={value}>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                }}
            >
                <Grid
                    container
                    sx={{
                        display: isMobile ? 'block' : 'flex',
                    }}
                    spacing={2}
                >
                    <Grid size={12}>
                        <DocumentUploadBox
                            onUpload={(file) => console.log("Uploading file:", file)}
                            onDelete={(id) => console.log("Deleted file ID:", id)}
                            initialDocuments={[
                                {
                                    id: "1",
                                    name: "License.pdf",
                                    size: 102400,
                                    type: "application/pdf",
                                    status: "Uploaded",
                                },
                            ]}
                        />
                    </Grid>
                </Grid>

            </Box>
        </TabPanel>
    )
}

export default DocumentUploadTab