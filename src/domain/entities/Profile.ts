import { BasicInformation, ProfileInformation } from "../../presentation/components/utils/types";



export class Profile {
    constructor(
        public readonly profile_information: ProfileInformation,
        public readonly basic_information: BasicInformation,
        public readonly bio: string
    ) { }

    public toJSON() {
        return {
            profile_information: this.profile_information,
            basic_information: this.basic_information,
            bio: this.bio
        }
    }
}