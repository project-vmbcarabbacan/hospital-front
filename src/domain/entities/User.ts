export class User {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly status: string,
        public readonly role_id: number,
        public readonly specialization_id: number,
        public readonly photo?: string,
        public readonly password?: string
    ) { }

    public toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            status: this.status,
            role_id: this.role_id,
            specialization_id: this.specialization_id,
            photo: this.photo,
        };
    }
}