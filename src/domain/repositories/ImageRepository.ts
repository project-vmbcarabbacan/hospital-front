export interface ImageRepository {
    uploadProfile(image: Blob): Promise<void>;
}
