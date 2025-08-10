import React, { useState } from "react";
import TabPanel from "./TabPanel";
import { Row, Value } from "../../utils/types";
import AddCard from "../../shared/AddCard";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import MembershipAffiliationBox from "./utils/MembershipAffiliationBox";

const MembershipAffiliationTab: React.FC<Value> = ({
    value
}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'lg'));

    const handleClick = (value: number) => {
        alert(value)
    }

    const rows: Row[] = [
        { id: 1, organizationName: 'American College of Cardiology', type: 'Membership', roleDesignation: 'Fellow (FACC)', startDate: '2018-06-01', endDate: '', membershipNo: 'ACC-998877', country: 'USA', status: 'Active', notes: 'Annual renewal required' },
        { id: 2, organizationName: 'Kenya Medical Practitioners Board', type: 'Membership', roleDesignation: 'Registered Doctor', startDate: '2010-09-01', endDate: '', membershipNo: 'KMPDB-556677', country: 'Kenya', status: 'Active', notes: 'Government registration' },
        { id: 3, organizationName: 'World Health Organization (WHO)', type: 'Affiliation', roleDesignation: 'Research Contributor', startDate: '2021-11-01', endDate: '', membershipNo: 'N/A', country: 'Global', status: 'Active', notes: 'Public health research involvement' },
        { id: 4, organizationName: 'Royal College of Surgeons of England', type: 'Membership', roleDesignation: 'Fellow (FRCS)', startDate: '2016-02-01', endDate: '2021-01-31', membershipNo: 'FRCS-112233', country: 'UK', status: 'Expired', notes: 'Membership not renewed' },
        { id: 5, organizationName: 'Harvard Medical School', type: 'Affiliation', roleDesignation: 'Research Affiliate', startDate: '2019-08-01', endDate: '', membershipNo: 'N/A', country: 'USA', status: 'Active', notes: 'International collaboration' },
    ];

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <TabPanel value={5} index={value}>
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
                    <Grid size={{ sm: 12, md: 6 }} >
                        <AddCard onClick={handleOpen} />
                    </Grid>
                    {rows.map((row, index) => (
                        <Grid size={{ sm: 12, md: 6 }} key={index}>
                            <MembershipAffiliationBox
                                id={row.organizationName as number}
                                organizationName={row.organizationName as string}
                                type={row.type as "Membership" | "Affiliation"}
                                roleDesignation={row.roleDesignation as string}
                                startDate={row.startDate as string}
                                endDate={row.endDate as string}
                                membershipNo={row.membershipNo as string}
                                country={row.country as string}
                                status={row.status as "Active" | "Inactive" | "Expired"}
                                notes={row.notes as string}
                                onClick={handleClick}
                            />
                        </Grid>
                    ))}
                </Grid>

            </Box>
        </TabPanel>
    )
}

export default MembershipAffiliationTab