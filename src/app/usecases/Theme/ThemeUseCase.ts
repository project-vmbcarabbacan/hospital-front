import { ThemeRepository } from "../../../domain/repositories/ThemeRepository";

export class ThemeUseCase {
    constructor(private themRepo: ThemeRepository) { }

    async execute(): Promise<any> {
        return await this.themRepo.fetchThemeSettings()
    }
}