import React from "react";
import { Box, Paper } from "@mui/material";
import TabHeader from "./Tabs/Header";
import ScheduleTab from "./Tabs/Schedule";
import BioTab from "./Tabs/Bio";
import AchievementTab from "./Tabs/Achievement";
import EducationQualificationTab from "./Tabs/EducationQualification";
import MembershipAffiliationTab from "./Tabs/MembershipAffiliation";
import DocumentUploadTab from "./Tabs/DocumentUpload";
import SecurityTab from "./Tabs/Security";
import { LabelValue } from "../utils/types";
import { useAppSelector } from "../../../app/store/hooks";



const Tabs: React.FC = () => {
    const { user } = useAppSelector(state => state.auth)

    const baseTabs: LabelValue[] = [
        {
            label: 'Bio',
            value: 2
        },
        {
            label: 'Achievements',
            value: 3
        },
        {
            label: 'Education & Qualifications',
            value: 4
        },
        {
            label: 'Memberships & Affiliations',
            value: 5
        },
        {
            label: 'Documents / Uploads',
            value: 6
        },
        {
            label: 'Security',
            value: 7
        },
    ]

    const tabs: LabelValue[] = user?.role_id === 3
        ? [{ label: 'Schedules', value: 1 }, ...baseTabs]
        : baseTabs;

    const defaultTab = user?.role_id === 3 ? 1 : 2;
    const [value, setValue] = React.useState(defaultTab);

    const handleChange = (value: number) => {
        setValue(value)
    }


    return (
        <Box
            sx={{
                bgcolor: 'background.paper',
                margin: 'auto',
                mt: 3,
                gap: 3,
                px: 2
            }}
        >
            <Paper
                elevation={3}
                sx={{ borderRadius: "15px", width: '100%' }}
            >
                <TabHeader
                    value={value}
                    tabs={tabs}
                    onChange={handleChange}
                />
                {user?.role_id === 3 && <ScheduleTab value={value} />}
                <BioTab value={value} />
                <AchievementTab value={value} />
                <EducationQualificationTab value={value} />
                <MembershipAffiliationTab value={value} />
                <DocumentUploadTab value={value} />
                <SecurityTab value={value} />
            </Paper>
        </Box>
    )
}

export default Tabs