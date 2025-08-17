import axios from "axios";
import { ImageRepository } from "../../domain/repositories/ImageRepository";
import { ApiService } from "../api/ApiService";
import { ApiError } from "../../domain/entities/ApiError";

export class ImageRepositoryImpl implements ImageRepository {
    constructor(private api: ApiService) { }

    async uploadProfile(formData: FormData): Promise<void> {
        try {

            await this.api.post('/image/upload/avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        } catch (err: unknown) {
            if (axios.isAxiosError<ApiError>(err)) {
                const message = err.response?.data?.message || err.message || 'Login failed';
                throw new Error(message)
            } else {
                throw new Error('Unexpected error')
            }
        }
    }
}