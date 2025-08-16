import { AppointmentSchedule } from "../../../domain/entities/AppointmentSchedule";
import { ScheduleRepository } from "../../../domain/repositories/ScheduleRepository";
import { DoctorSchedulesByDate } from "../../../presentation/components/utils/types";

export class SchedulesUseCase {
    constructor(private profileRepo: ScheduleRepository) { }

    async execute(form: DoctorSchedulesByDate): Promise<AppointmentSchedule[]> {
        return await this.profileRepo.getSchedule(form)
    }
}