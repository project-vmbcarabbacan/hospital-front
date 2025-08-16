import { UpdateByField } from "../../presentation/components/utils/types";
import { Profile } from "../entities/Profile";
import { ID } from "../valueObjects/ID";

export interface ProfileRepository {
    getProfile(id: ID): Promise<Profile>
    updateProfile(form: UpdateByField): Promise<void>
}