import axios from "axios";
import { ApiService } from "../api/ApiService";
import { ApiError } from "../../domain/entities/ApiError";
import { DoctorSchedulesByDate } from "../../presentation/components/utils/types";
import { AppointmentSchedule } from "../../domain/entities/AppointmentSchedule";
import { ScheduleRepository } from "../../domain/repositories/ScheduleRepository";

export class ScheduleRepositoryImpl implements ScheduleRepository {
    constructor(private api: ApiService) { }

    async getSchedule(form: DoctorSchedulesByDate): Promise<AppointmentSchedule[]> {
        try {
            const response = await this.api.post('/schedule/appointments', form)
            if (response.status !== 200) {
                throw new Error(response.data.message || 'Profile Error')
            }

            const schedules = response.data.data.map((schedule: {
                patient_id: number;
                patient: string;
                type: string;
                service: string;
            }) => {
                const instance = new AppointmentSchedule(
                    schedule.patient_id,
                    schedule.patient,
                    schedule.type,
                    schedule.service,
                );

                return {
                    patient_id: instance.patient_id,
                    name: instance.name,
                    type: instance.type,
                    purpose: instance.purpose,
                };
            });

            return schedules

        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const message = err.response?.data?.message || err.message || 'Profile failed';
                throw new Error(message)
            } else {
                throw new Error('Unexpected error')
            }
        }
    }
}