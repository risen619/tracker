import { IRegisterDTO } from "@tracker/api-interfaces";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class RegisterDTO implements IRegisterDTO
{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(8, 20)
    @IsNotEmpty()
    password: string;
}