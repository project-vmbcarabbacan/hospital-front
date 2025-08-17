import { container } from './container'
import { TOKENS } from './types'

import { ApiService } from '../infrastructure/api/ApiService'
import { AuthRepositoryImpl } from '../infrastructure/repositories/AuthRepositoryImpl'
import { ThemeRepositoryImpl } from '../infrastructure/repositories/ThemeRepositoryImpl'
import { ProfileRepositoryImpl } from '../infrastructure/repositories/ProfileRepositoryImp'
import { ScheduleRepositoryImpl } from '../infrastructure/repositories/ScheduleRepositoryImp'
import { ImageRepositoryImpl } from '../infrastructure/repositories/ImageRepositoryImpl'

import { LoginUseCase } from '../app/usecases/Auth/LoginUseCase'
import { LoggedInUserUseCase } from '../app/usecases/Auth/LoggedInUserUseCase'
import { LogoutUseCase } from '../app/usecases/Auth/LogoutUseCase'
import { ThemeUseCase } from '../app/usecases/Theme/ThemeUseCase'
import { ProfileUseCase } from '../app/usecases/Profile/ProfileUseCase'
import { ProfileUpdateUseCase } from '../app/usecases/Profile/ProfileUpdateUseCase'
import { SchedulesUseCase } from '../app/usecases/Profile/SchedulesUseCase'
import { UploadProfileUseCase } from '../app/usecases/Image/UploadProfileUseCase'
import { AchievementAddUseCase } from '../app/usecases/Profile/AchievementAddUseCase'


export function setup() {
    const api = new ApiService('http://hospital.test')
    const authRepository = new AuthRepositoryImpl(api)
    const themeRepository = new ThemeRepositoryImpl(api)
    const profileRepositoryImp = new ProfileRepositoryImpl(api)
    const scheduleRepositoryImpl = new ScheduleRepositoryImpl(api)
    const imageRepositoryImpl = new ImageRepositoryImpl(api)

    const loginUseCase = new LoginUseCase(authRepository)
    const loggedInUserUseCase = new LoggedInUserUseCase(authRepository)
    const logoutUseCase = new LogoutUseCase(authRepository)
    const themeUseCase = new ThemeUseCase(themeRepository)
    const profileUseCase = new ProfileUseCase(profileRepositoryImp)
    const profileUpdateUseCase = new ProfileUpdateUseCase(profileRepositoryImp)
    const achievementAddUseCase = new AchievementAddUseCase(profileRepositoryImp)
    const schedulesUseCase = new SchedulesUseCase(scheduleRepositoryImpl)
    const uploadProfileUseCase = new UploadProfileUseCase(imageRepositoryImpl)


    container.register(TOKENS.ApiService, api)
    container.register(TOKENS.AuthRepository, authRepository)
    container.register(TOKENS.ThemeRepository, themeRepository)
    container.register(TOKENS.ProfileRepositoryImp, profileRepositoryImp)
    container.register(TOKENS.ScheduleRepository, scheduleRepositoryImpl)
    container.register(TOKENS.ImageRepositoryImpl, imageRepositoryImpl)

    container.register(TOKENS.LoginUseCase, loginUseCase)
    container.register(TOKENS.LoggedInUserUseCase, loggedInUserUseCase)
    container.register(TOKENS.LogoutUseCase, logoutUseCase)

    container.register(TOKENS.ThemeUseCase, themeUseCase)

    container.register(TOKENS.ProfileUseCase, profileUseCase)
    container.register(TOKENS.ProfileUpdateUseCase, profileUpdateUseCase)
    container.register(TOKENS.AchievementAddUseCase, achievementAddUseCase)
    container.register(TOKENS.SchedulesUseCase, schedulesUseCase)
    container.register(TOKENS.UploadProfileUseCase, uploadProfileUseCase)
}