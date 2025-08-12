import { Profile } from "../entities/Profile";
import { ID } from "../valueObjects/ID";

export interface ProfileRepository {
    getProfile(id: ID): Promise<Profile>
}