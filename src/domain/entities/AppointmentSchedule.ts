export class AppointmentSchedule {
    constructor(
        public readonly patient_id: number,
        public readonly name: string,
        public readonly type: string,
        public readonly purpose: string
    ) { }

    public toJSON() {
        return {
            patient_id: this.patient_id,
            name: this.name,
            type: this.type,
            purpose: this.purpose,
        }
    }
}