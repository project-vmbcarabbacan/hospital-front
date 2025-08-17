import { AddAchievement, UpdateByField } from "../../presentation/components/utils/types";
import { Achievement } from "../entities/Achievement";
import { Profile } from "../entities/Profile";
import { ID } from "../valueObjects/ID";

export interface ProfileRepository {
    getProfile(id: ID): Promise<Profile>
    updateProfile(form: UpdateByField): Promise<void>
    addAchievement(form: AddAchievement): Promise<Achievement>
}