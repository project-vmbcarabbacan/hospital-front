import React, { useState } from "react";
import TabPanel from "./TabPanel";
import { Row, Value } from "../../utils/types";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import EducationAchievementBox from "./utils/EducationAchievementBox";
import AddCard from "../../shared/AddCard";

const EducationQualificationTab: React.FC<Value> = ({
    value
}) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'lg'));

    const handleClick = (value: number) => {
        alert(value)
    }

    const rows: Row[] = [
        { id: 1, qualification: 'MBBS', specialization: 'General Medicine', institution: 'University of La Salette (ULS)', country: 'Philippines', startDate: '2008-07-01', endDate: '2014-06-30', licenseNo: 'MCI/123456', issuingAuthority: 'Philippine Regulation Authority', additionalCertifications: 'BLS, ACLS', verified: true, notes: '-' },
        { id: 2, qualification: 'MD', specialization: 'Cardiology', institution: 'Johns Hopkins University', country: 'USA', startDate: '2015-08-01', endDate: '2019-05-30', licenseNo: 'USMLE-654321', issuingAuthority: 'ECFMG / USMLE', additionalCertifications: 'ACLS, Advanced Echo Course', verified: true, notes: 'Fellowship in progress' },
        { id: 3, qualification: 'BSc Nursing', specialization: 'Nursing', institution: 'University of Toronto', country: 'Canada', startDate: '2012-09-01', endDate: '2016-06-15', licenseNo: 'RN-ON-789101', issuingAuthority: 'College of Nurses of Ontario', additionalCertifications: 'Infection Control, CPR', verified: true, notes: 'Requires annual recertification' },
        { id: 4, qualification: 'Diploma', specialization: 'Radiology', institution: 'Far Eastern University (FEU)', country: 'Philippines', startDate: '2010-06-01', endDate: '2012-05-30', licenseNo: 'DMC-452012', issuingAuthority: 'Philippine Regulation Authority', additionalCertifications: 'Radiation Safety Certificate', verified: true, notes: 'Updated license in 2024' },
        { id: 5, qualification: 'MBBS', specialization: 'Pediatrics', institution: 'University of Nairobi', country: 'Kenya', startDate: '2009-01-01', endDate: '2015-12-01', licenseNo: 'KMPDB-220011', issuingAuthority: 'Kenya Medical Practitioners Board', additionalCertifications: 'Neonatal Care, BLS', verified: false, notes: 'Awaiting document upload' },
    ];

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <TabPanel value={4} index={value}>
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
                            <EducationAchievementBox
                                id={row.id as number}
                                qualification={row.qualification as string}
                                specialization={row.specialization as string}
                                institution={row.institution as string}
                                country={row.country as string}
                                startDate={row.startDate as string}
                                endDate={row.endDate as string}
                                licenseNo={row.licenseNo as string}
                                issuingAuthority={row.issuingAuthority as string}
                                additionalCertifications={row.additionalCertifications as string}
                                verified={row.verified as boolean}
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

export default EducationQualificationTab