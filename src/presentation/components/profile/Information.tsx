import React from "react";
import { Box, Typography, Paper, Grid, useTheme, useMediaQuery } from "@mui/material";
import LabelValueField from "../shared/LabelValueField";
import AvatarCropper from "../shared/CircularAvatarField";

interface InformationProps {
    name: string
    email: string
    contact: string
    status: string
    avatarUrl: string
    isFlex: boolean
}

const ProfileInformation: React.FC<InformationProps> = ({
    name, email, contact, status, avatarUrl, isFlex
}) => {
    const isActive = status === "Active";
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleAvatarChange = (image: string) => {
        // setAvatar(image)
        console.log({ image })
    }

    return (
        <Box
            sx={{
                maxWidth: "500",
                margin: 'auto',
                mt: 5,
                display: isFlex ? 'flex' : 'block',
                gap: 3
            }}
        >
            <Paper
                elevation={3}
                sx={{ p: 3, borderRadius: "15px", }}
            >
                <Grid container spacing={2}>
                    <Grid
                        size={{ xs: 12, md: 3 }}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        {/* <Avatar
                            src={avatarUrl}
                            alt={name}
                            sx={{ width: 130, height: 130 }}
                        /> */}
                        <AvatarCropper
                            initialImage={avatarUrl}
                            onImageChange={(imgUrl) => handleAvatarChange(imgUrl)}
                            size={130}
                        />

                    </Grid>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Grid container spacing={isMobile ? 0 : 4}
                        >
                            <Grid
                                size={{ xs: 12, md: 8.5 }}
                            >

                                <Typography variant="h5" sx={{ textAlign: isMobile ? 'center' : 'start' }} >
                                    {name}
                                </Typography>

                            </Grid>
                            <Grid
                                size={{ xs: 12, md: 3.5 }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: isActive ? "#C8E6C9" : "#FFCDD2",
                                        color: isActive ? "#2E7D32" : "#C62828",
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
                                    {status}
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid
                            container spacing={isMobile ? 0 : 6}
                        >
                            <Grid size={{ xs: 12, md: 4 }} >
                                <LabelValueField
                                    label="Role"
                                    value="User"
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 8 }} >
                                <LabelValueField
                                    label="Department"
                                    value="IT Department"
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <LabelValueField
                                label="Email"
                                value={email}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <LabelValueField
                                label="Phone"
                                value={contact}
                            />
                        </Box>

                    </Grid>
                </Grid>
            </Paper>
        </Box >
    )
}

export default ProfileInformation;