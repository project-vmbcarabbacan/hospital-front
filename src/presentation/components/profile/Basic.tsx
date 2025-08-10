import React, { useState } from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Divider,
} from "@mui/material";
import EditableLabelTextField from "../shared/EditableLabelTextField";
import IconWithTextField from "../shared/IconWithTextField";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface BasicInformationProps {
    employeeId: number;
    hireDate: string;
    workFor: string;
    licenseNumber: string;
    licenseExpiry: string;
    birthDate: string;
    address: string;
    daysOfWorking: string;
    workTimings: string;
    occupationType: string;
    onSubmit?: (param: string, value: string) => void;
}

const BasicInformation: React.FC<BasicInformationProps> = ({
    employeeId,
    hireDate,
    workFor,
    licenseNumber,
    licenseExpiry,
    birthDate,
    address,
    daysOfWorking,
    workTimings,
    occupationType,
    onSubmit,
}) => {

    const [formData, setFormData] = useState({
        licenseNumber,
        licenseExpiry,
        birthDate,
        address,
        daysOfWorking,
        workTimings,
        occupationType,
    });

    const handleFieldChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (onSubmit) onSubmit(field, value);
    };

    return (
        <Box
            sx={{
                maxWidth: "500",
                margin: 'auto',
                mt: 3,
                display: 'flex',
                gap: 3,
                px: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{ p: 3, borderRadius: "15px", width: '100%' }}
            >
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Basic Information
                </Typography>
                <Divider sx={{ mb: 1 }} />

                {/* Fixed top row */}
                <Grid container mb={3}>
                    <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                        <EditableLabelTextField
                            label="Employee ID"
                            value={employeeId}
                            isEditable={false}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>

                        <EditableLabelTextField
                            label="Hire Date"
                            value={hireDate}
                            isEditable={false}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 5 }}>
                        <EditableLabelTextField
                            label="Work For"
                            value={workFor}
                            isEditable={false}
                        />
                    </Grid>
                </Grid>


                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Personal Information
                </Typography>
                <Divider sx={{ mb: 1 }} />
                {/* Editable fields */}
                <Grid container mb={3}>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <EditableLabelTextField
                            label="License Number"
                            value={formData.licenseNumber}
                            onChange={(val) => handleFieldChange('licenseNumber', val)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <EditableLabelTextField
                            label="License Expiry"
                            type="date"
                            value={formData.licenseExpiry}
                            onChange={(val) => handleFieldChange('licenseExpiry', val)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <EditableLabelTextField
                            label="Birth Date"
                            type="date"
                            value={formData.birthDate}
                            onChange={(val) => handleFieldChange('birthDate', val)}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <EditableLabelTextField
                            label="Address"
                            value={formData.address}
                            onChange={(val) => handleFieldChange('address', val)}
                        />
                    </Grid>

                </Grid>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                    Employment Information
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Grid container mb={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <IconWithTextField
                            text={occupationType}
                            IconComponent={LocalHospitalIcon}
                            color="#2196f3"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>

                        <IconWithTextField
                            text={daysOfWorking}
                            IconComponent={CalendarTodayIcon}
                            color="#2196f3"
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>

                        <IconWithTextField
                            text={workTimings}
                            IconComponent={AccessTimeIcon}
                            color="#2196f3"
                        />
                    </Grid>


                </Grid>
            </Paper>
        </Box>
    );
};

export default BasicInformation;
