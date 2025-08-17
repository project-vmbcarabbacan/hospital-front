import { Achievement } from "../../../domain/entities/Achievement";
import { ProfileRepository } from "../../../domain/repositories/ProfileRepository";
import { AddAchievement } from "../../../presentation/components/utils/types";

export class AchievementAddUseCase {
    constructor(private profileRepo: ProfileRepository) { }

    async execute(form: AddAchievement): Promise<Achievement> {
        return await this.profileRepo.addAchievement(form)
    }
}