import { ProfileRepository } from "../../../domain/repositories/ProfileRepository";
import { UpdateByField } from "../../../presentation/components/utils/types";

export class ProfileUpdateUseCase {
    constructor(private profileRepo: ProfileRepository) { }

    async execute(form: UpdateByField): Promise<void> {
        return await this.profileRepo.updateProfile(form)
    }
}