export class Achievement {
    constructor(
        public readonly achievement_id: number,
        public readonly title: string,
        public readonly description: string,
        public readonly year_awarded: string,
    ) { }

    public toJSON() {
        return {
            achievement_id: this.achievement_id,
            title: this.title,
            description: this.description,
            year_awarded: this.year_awarded
        }
    }
}