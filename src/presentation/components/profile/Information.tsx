import React from "react";
import { Box, Typography, Paper, Grid, useTheme, useMediaQuery } from "@mui/material";
import LabelValueField from "../shared/LabelValueField";
import AvatarCropper from "../shared/AvatarField";
import StatusField from "../shared/StatusField";
import Rating from '@mui/material/Rating';

interface InformationProps {
    name: string
    email: string
    contact: string
    status: string
    avatarUrl: string
    role: string
    department: string
    rating: number
    isFlex: boolean
}

const ProfileInformation: React.FC<InformationProps> = ({
    name, email, contact, status, avatarUrl, role, department, rating, isFlex
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'lg'));

    const handleAvatarChange = (image: string) => {
        // setAvatar(image)
        console.log({ image })
    }

    return (
        <Box
            sx={{
                maxWidth: "500",
                margin: 'auto',
                mt: 3,
                display: isFlex ? 'flex' : 'block',
                gap: 3,
                px: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{ p: 3, borderRadius: "15px", width: '100%' }}
            >
                <Grid container spacing={2}>
                    <Grid
                        size={{ xs: 12, xl: 3 }}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >

                        <Grid>
                            <AvatarCropper
                                initialImage={avatarUrl}
                                onImageChange={(imgUrl) => handleAvatarChange(imgUrl)}
                                size={130}
                            />
                            {rating > 0 ?
                                (
                                    <Rating defaultValue={rating} precision={0.1} readOnly />
                                ) : ('')
                            }
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, xl: 9 }}>
                        <Grid container
                        >
                            <Grid
                                size={{ xs: 12, lg: 8.5 }}
                            >

                                <Typography variant="h5" textAlign={isMobile ? 'center' : 'start'} >
                                    {name}
                                </Typography>

                            </Grid>
                            <Grid
                                size={{ xs: 12, lg: 3.5 }}
                            >
                                <StatusField
                                    text={status}
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid
                            container
                            justifyContent={'space-between'}
                        >
                            <Grid size={{ xs: 12, lg: 4 }} >
                                <LabelValueField
                                    label="Role"
                                    value={role}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, lg: 6 }}>
                                <LabelValueField
                                    label="Department"
                                    value={department}
                                />
                            </Grid>
                        </Grid> */}
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <LabelValueField
                                label="Role"
                                value={role}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <LabelValueField
                                label="Department"
                                value={department}
                            />
                        </Box>
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