import { UserLogin } from "../../domain/entities/UserLogin";

export interface UserLoginDTO {
    email: string;
    password: string;
}

export function toEntity(dto: UserLoginDTO): UserLogin {
    return new UserLogin(dto.email, dto.password);
}