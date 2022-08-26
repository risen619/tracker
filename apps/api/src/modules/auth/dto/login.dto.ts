import { IsEmail, IsNotEmpty, Length } from 'class-validator';

import { ILoginDTO } from "@tracker/api-interfaces";

export class LoginDTO implements ILoginDTO
{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(8, 20)
    @IsNotEmpty()
    password: string;
}