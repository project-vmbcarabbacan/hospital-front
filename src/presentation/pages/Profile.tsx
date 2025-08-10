// src/pages/Reports.tsx
import React from 'react';
import { Grid } from '@mui/material';
import ProfileInformation from '../components/profile/Information';
import BasicInformation from '../components/profile/Basic';
import TabInformation from '../components/profile/Tabs';

const Reports: React.FC = () => {
    return (
        <Grid container >
            <Grid size={{ xs: 12, lg: 5 }}>
                <ProfileInformation
                    name="Vincent Carabbacan"
                    email="vmbcarabbacan@gmail.com"
                    contact="+971 56 636 8779"
                    avatarUrl="https://i.pravatar.cc/150?img=12"
                    status='Inactive'
                    role="User"
                    department="IT Department"
                    rating={4.2}
                    isFlex={true}
                />
                <BasicInformation
                    employeeId={12345}
                    hireDate="03/15/2017"
                    workFor="7years and 6months"
                    licenseNumber="12345-678-9-0"
                    licenseExpiry='2026-06-26'
                    birthDate="1992-03-15"
                    address="Dubai, Dubai"
                    daysOfWorking="Mon - Fri"
                    workTimings="08:00AM to 05:00PM"
                    occupationType="Full time"
                />
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
                <TabInformation />
            </Grid>

        </Grid>
    );
};

export default Reports;
