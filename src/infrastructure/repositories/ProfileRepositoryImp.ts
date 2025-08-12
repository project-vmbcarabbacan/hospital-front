import axios from "axios";
import { ProfileRepository } from "../../domain/repositories/ProfileRepository";
import { ID } from "../../domain/valueObjects/ID";
import { ApiService } from "../api/ApiService";
import { ApiError } from "../../domain/entities/ApiError";
import { Profile } from "../../domain/entities/Profile";

export class ProfileRepositoryImpl implements ProfileRepository {
    constructor(private api: ApiService) { }

    async getProfile(id: ID): Promise<Profile> {
        try {
            const response = await this.api.get(`/profile/${id}`,)

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Profile Error')
            }

            const profile = new Profile(
                response.data.data.profile_information,
                response.data.data.basic_information,
            )

            return profile
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const message = err.response?.data?.message || err.message || 'Profile failed';
                throw new Error(message)
            } else {
                throw new Error('Unexpected error')
            }
        }
    }
}