import { DoctorSchedulesByDate } from "../../presentation/components/utils/types";
import { AppointmentSchedule } from "../entities/AppointmentSchedule";

export interface ScheduleRepository {
    getSchedule(form: DoctorSchedulesByDate): Promise<AppointmentSchedule[]>
}