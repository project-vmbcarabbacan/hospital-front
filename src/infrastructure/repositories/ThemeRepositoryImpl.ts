import { ThemeSettings } from '../../core/theme/ThemeTypes';
import { ThemeRepository } from '../../domain/repositories/ThemeRepository';
import { ApiService } from '../api/ApiService';

export class ThemeRepositoryImpl implements ThemeRepository {
    constructor(private api: ApiService) { }

    async fetchThemeSettings(): Promise<ThemeSettings> {
        const response = await this.api.post('/api/settings/theme')

        return response.data
    }
}