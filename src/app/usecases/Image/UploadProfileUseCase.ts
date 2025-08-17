import { ImageRepository } from "../../../domain/repositories/ImageRepository";

export class UploadProfileUseCase {
    constructor(private imageRepo: ImageRepository) { }

    async execute(formData: FormData): Promise<void> {
        await this.imageRepo.uploadProfile(formData)
    }
}