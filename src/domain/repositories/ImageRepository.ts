export interface ImageRepository {
    uploadProfile(formData: FormData): Promise<void>;
}
