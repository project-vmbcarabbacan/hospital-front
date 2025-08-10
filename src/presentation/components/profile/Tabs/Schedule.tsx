import React from "react";
import TabPanel from "./TabPanel";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Grid, Paper } from "@mui/material";
import { Column, Row, Value } from "../../utils/types";
import HospitalTable from "../../shared/HospitalTable";


const ScheduleTab: React.FC<Value> = ({
    value
}) => {

    const [currentDate, setCurrentDate] = React.useState<Dayjs | null>(dayjs());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const fetchSchedules = (date: Dayjs) => {
        console.log({ date: date.format('YYYY-MM-DD') })
        setCurrentDate(date)
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
    };

    const handleColumnAction = (row: Row) => {
        console.log({ row })
    }

    const columns: Column[] = [
        {
            value: 'name',
            label: 'Name',
            minWidth: 170,
            action: handleColumnAction
        },
        { value: 'type', label: 'Type', minWidth: 100 },
        { value: 'purpose', label: 'Purpose', minWidth: 170 },
    ];

    function createData(
        name: string,
        type: string,
        purpose: string,
    ): Row {
        return { name, type, purpose };
    }

    const rows = [
        createData("John Doe", "Consultation", "General check-up for fatigue and headache."),
        createData("Jane Smith", "Follow-Up Appointment", "Post-surgery recovery monitoring."),
        createData("Michael Brown", "Diagnostic Services", "MRI scan for back pain."),
        createData("Emma Wilson", "Consultation", "Skin rash evaluation with a dermatologist."),
        createData("Daniel Garcia", "Follow-Up Appointment", "Diabetes medication review."),
        createData("Olivia Martinez", "Diagnostic Services", "Blood test for cholesterol."),
        createData("William Lee", "Consultation", "High blood pressure evaluation."),
        createData("Sophia Kim", "Follow-Up Appointment", "Thyroid level review."),
        createData("James Patel", "Diagnostic Services", "X-ray for suspected fracture."),
        createData("Isabella Nguyen", "Consultation", "Persistent cough examination."),
        createData("Ethan Hernandez", "Follow-Up Appointment", "Check-up after asthma attack."),
        createData("Ava Clark", "Diagnostic Services", "Ultrasound for abdominal pain."),
        createData("Alexander Lewis", "Consultation", "Joint pain consultation with orthopedic."),
        createData("Mia Robinson", "Follow-Up Appointment", "Review MRI results with neurologist."),
        createData("Benjamin Walker", "Diagnostic Services", "ECG for irregular heartbeat."),
        createData("Charlotte Hall", "Consultation", "Eye irritation consultation."),
        createData("Logan Allen", "Follow-Up Appointment", "Post-physical therapy progress review."),
        createData("Amelia Young", "Diagnostic Services", "Blood sugar and insulin test."),
        createData("Jacob King", "Consultation", "Mental health evaluation."),
        createData("Harper Wright", "Follow-Up Appointment", "Sleep apnea follow-up."),
        createData("Matthew Scott", "Diagnostic Services", "CT scan for head injury."),
        createData("Evelyn Green", "Consultation", "Pediatric check-up for growth monitoring."),
        createData("Sebastian Adams", "Follow-Up Appointment", "Post-COVID lung function review."),
        createData("Abigail Baker", "Diagnostic Services", "Endoscopy for stomach issues."),
        createData("Liam Nelson", "Consultation", "Travel vaccination consultation.")
    ];

    const paginatedRows = rows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <TabPanel value={1} index={value}>
            <Grid
                container
                direction="row-reverse"

            >
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box
                        sx={{
                            padding: 1
                        }}
                    >
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 5
                            }}
                        >
                            <DateCalendar
                                value={currentDate}
                                onChange={(newValue) => fetchSchedules(dayjs(newValue))}
                                sx={{
                                    width: '100%',
                                    maxWidth: '100%',
                                    '& .MuiPickersCalendarHeader-root, & .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
                                        width: '100%',
                                    },
                                }}

                            />
                        </Paper>
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }}>
                    <HospitalTable
                        columns={columns}
                        rows={paginatedRows}
                        page={page}
                        total={rows.length}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </TabPanel>
    )
}

export default ScheduleTab