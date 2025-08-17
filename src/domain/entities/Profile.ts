import { BasicInformation, ProfileInformation } from "../../presentation/components/utils/types";
import { Achievement } from "./Achievement";



export class Profile {
    constructor(
        public readonly profile_information: ProfileInformation,
        public readonly basic_information: BasicInformation,
        public readonly achievements: Achievement[],
        public readonly bio: string
    ) { }

    public toJSON() {
        return {
            profile_information: this.profile_information,
            basic_information: this.basic_information,
            achievements: this.achievements,
            bio: this.bio
        }
    }
}