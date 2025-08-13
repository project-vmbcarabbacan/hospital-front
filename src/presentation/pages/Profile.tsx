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

    const { profile_information, basic_information } = useAppSelector(state => state.profile)

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

                {basic_information ?
                    (<BasicInformation
                        employeeId={basic_information!.employee_id}
                        hireDate={basic_information!.hired_date}
                        workFor={basic_information!.work_for}
                        licenseNumber={basic_information!.license_number}
                        licenseExpiry={basic_information!.license_expiry}
                        birthDate={basic_information!.birth_date}
                        address={basic_information!.address}
                        daysOfWorking={basic_information!.days_of_working}
                        workTimings={basic_information!.work_timing}
                        occupationType={basic_information!.occupation_type}
                    />) : ('')}
            </Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
                <TabInformation />
            </Grid>

        </Grid>
    );
};

export default Reports;
