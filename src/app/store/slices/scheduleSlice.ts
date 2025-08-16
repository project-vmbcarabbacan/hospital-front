import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentSchedule } from "../../../domain/entities/AppointmentSchedule";
import { DoctorSchedulesByDate } from "../../../presentation/components/utils/types";
import { SchedulesUseCase } from "../../usecases/Profile/SchedulesUseCase";
import { container } from "../../../di/container";
import { ApiError } from "../../../domain/entities/ApiError";
import { TOKENS } from "../../../di/types";
import axios from "axios";

interface ScheduleState {
    appointment: AppointmentSchedule[] | null
}

const initialState: ScheduleState = {
    appointment: null
}

export const getSchedule = createAsyncThunk(
    'schedules/doctor',
    async (form: DoctorSchedulesByDate, { rejectWithValue }) => {
        try {
            const getScheduleUseCase = container.resolve<SchedulesUseCase>(TOKENS.SchedulesUseCase)
            const schedule = await getScheduleUseCase.execute(form)
            return schedule;
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                return rejectWithValue(err.response?.data?.message || err.message || 'Update profile failed');
            }
            return rejectWithValue('Unexpected profile update error');
        }
    }
)

const scheduleSlice = createSlice({
    name: 'appointment',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getSchedule.fulfilled, (state: ScheduleState, actions: PayloadAction<AppointmentSchedule[]>) => {
                state.appointment = actions.payload
            })
    }
})

export default scheduleSlice.reducer