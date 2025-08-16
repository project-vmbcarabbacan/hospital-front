import React, { useEffect, useRef } from "react";
import TabPanel from "./TabPanel";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import { Box, Grid, Paper } from "@mui/material";
import { Column, DoctorSchedulesByDate, Row, Value } from "../../utils/types";
import HospitalTable from "../../shared/HospitalTable";
import { getSchedule } from "../../../../app/store/slices/scheduleSlice";
import { useAppSelector } from "../../../../app/store/hooks";
import { useDispatch } from 'react-redux';


const ScheduleTab: React.FC<Value> = ({
    value
}) => {

    const dispatch = useDispatch()
    const [currentDate, setCurrentDate] = React.useState<Dayjs | null>(dayjs());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const hasDispatched = useRef(false)
    const { user } = useAppSelector(state => state.auth)
    const { appointment } = useAppSelector(state => state.schedule)

    useEffect(() => {
        if (!hasDispatched.current) {
            hasDispatched.current = true
            const currentDate = dayjs().format('YYYY-MM-DD');

            const form: DoctorSchedulesByDate = {
                user_id: user!.id,
                date: currentDate
            }
            dispatch(getSchedule(form))
        }
    }, [dispatch])

    const fetchSchedules = (date: Dayjs) => {
        setCurrentDate(date)
        const form: DoctorSchedulesByDate = {
            user_id: user!.id,
            date: date.format('YYYY-MM-DD')
        }
        dispatch(getSchedule(form))

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
                        rows={appointment}
                        page={page}
                        total={appointment ? appointment.length : 0}
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