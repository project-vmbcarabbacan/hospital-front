import { container } from './container'
import { TOKENS } from './types'

import { ApiService } from '../infrastructure/api/ApiService'
import { AuthRepositoryImpl } from '../infrastructure/repositories/AuthRepositoryImpl'
import { ThemeRepositoryImpl } from '../infrastructure/repositories/ThemeRepositoryImpl'
import { ProfileRepositoryImpl } from '../infrastructure/repositories/ProfileRepositoryImp'

import { LoginUseCase } from '../app/usecases/Auth/LoginUseCase'
import { LoggedInUserUseCase } from '../app/usecases/Auth/LoggedInUserUseCase'
import { LogoutUseCase } from '../app/usecases/Auth/LogoutUseCase'
import { ThemeUseCase } from '../app/usecases/Theme/ThemeUseCase'
import { ProfileUseCase } from '../app/usecases/Profile/ProfileUseCase'


export function setup() {
    const api = new ApiService('http://hospital.test')
    const authRepository = new AuthRepositoryImpl(api)
    const themeRepository = new ThemeRepositoryImpl(api)
    const profileRepositoryImp = new ProfileRepositoryImpl(api)

    const loginUseCase = new LoginUseCase(authRepository)
    const loggedInUserUseCase = new LoggedInUserUseCase(authRepository)
    const logoutUseCase = new LogoutUseCase(authRepository)
    const themeUseCase = new ThemeUseCase(themeRepository)
    const profileUseCase = new ProfileUseCase(profileRepositoryImp)


    container.register(TOKENS.ApiService, api)
    container.register(TOKENS.AuthRepository, authRepository)
    container.register(TOKENS.ThemeRepository, themeRepository)
    container.register(TOKENS.ProfileRepositoryImp, profileRepositoryImp)

    container.register(TOKENS.LoginUseCase, loginUseCase)
    container.register(TOKENS.LoggedInUserUseCase, loggedInUserUseCase)
    container.register(TOKENS.LogoutUseCase, logoutUseCase)

    container.register(TOKENS.ThemeUseCase, themeUseCase)

    container.register(TOKENS.ProfileUseCase, profileUseCase)
}