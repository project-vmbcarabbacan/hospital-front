// src/pages/Reports.tsx
import React, { useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import ProfileInformation from '../components/profile/Information';
import BasicInformation from '../components/profile/Basic';
import TabInformation from '../components/profile/Tabs';
import { useDispatch } from 'react-redux';
import { getProfileById } from '../../app/store/slices/profileSlice';
import { ID } from '../../domain/valueObjects/ID';
import { useAppSelector } from '../../app/store/hooks';

const Reports: React.FC = () => {

    const dispatch = useDispatch()
    const hasDispatched = useRef(false)

    useEffect(() => {
        if (!hasDispatched.current) {
            hasDispatched.current = true
            dispatch(getProfileById(new ID(1)))
        }
    }, [dispatch])

    const { profile_information } = useAppSelector(state => state.profile)

    return (
        <Grid container >
            <Grid size={{ xs: 12, lg: 5 }}>
                {profile_information ?
                    (
                        <ProfileInformation
                            name={profile_information!.name}
                            email={profile_information!.email}
                            contact={profile_information!.contact}
                            avatarUrl={profile_information!.avatar_url}
                            status={profile_information!.status}
                            role={profile_information!.role}
                            department={profile_information!.department}
                            rating={profile_information!.rating}
                            isFlex={true}
                        />
                    ) : ('')
                }

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
