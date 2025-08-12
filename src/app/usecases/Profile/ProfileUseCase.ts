import { Profile } from "../../../domain/entities/Profile";
import { ProfileRepository } from "../../../domain/repositories/ProfileRepository";
import { ID } from "../../../domain/valueObjects/ID";

export class ProfileUseCase {
    constructor(private profileRepo: ProfileRepository) { }

    async execute(id: ID): Promise<Profile> {
        return await this.profileRepo.getProfile(id)
    }
}