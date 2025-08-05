// src/pages/Reports.tsx
import React from 'react';
import { Grid } from '@mui/material';
import ProfileInformation from '../components/profile/Information';

const Reports: React.FC = () => {
    return (
        <Grid container >
            <Grid size={{ xs: 12, md: 4 }}>
                <ProfileInformation
                    name="Vincent Carabbacan"
                    email="vmbcarabbacan@gmail.com"
                    contact="+971 56 636 8779"
                    avatarUrl="https://i.pravatar.cc/150?img=12"
                    status='Inactive'
                    isFlex={true}
                />
                <ProfileInformation
                    name="Zack Carabbacan"
                    email="zack@gmail.com"
                    contact="+971 56 636 8779"
                    avatarUrl="https://i.pravatar.cc/150?img=15"
                    status='Active'
                    isFlex={true}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
                <ProfileInformation
                    name="Vincent Carabbacan"
                    email="vmbcarabbacan@gmail.com"
                    contact="+971 56 636 8779"
                    avatarUrl="https://i.pravatar.cc/150?img=13"
                    status='Active'
                    isFlex={false}
                />
                <ProfileInformation
                    name="Vincent Carabbacan"
                    email="vmbcarabbacan@gmail.com"
                    contact="+971 56 636 8779"
                    avatarUrl="https://i.pravatar.cc/150?img=13"
                    status='Active'
                    isFlex={false}
                />
            </Grid>

        </Grid>
    );
};

export default Reports;
