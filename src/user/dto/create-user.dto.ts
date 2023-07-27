import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string; // previous password
    
    @IsNotEmpty()
    @IsString()
    newPassword: string; // new password
}