import { User } from "../entities/User"
import { Email } from "../valueObjects/Email"
import { Password } from "../valueObjects/Password"

export interface AuthRepository {
    login(email: Email, password: Password): Promise<User> // return token
    user(): Promise<User>
    logout(): Promise<void>
}