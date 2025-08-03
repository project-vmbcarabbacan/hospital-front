export class UserLogin {

    constructor(
        public readonly email: string, public readonly password: string) {

        if (!email.includes('@')) throw new Error('Invalid email')
        if (password.length < 6) throw new Error('Password too short')

        this.email = email
        this.password = password
    }
}