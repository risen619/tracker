import { IsEmail, IsNotEmpty } from "class-validator";

import { IForgotPasswordDTO } from "@tracker/api-interfaces";

export class ForgotPasswordDTO implements IForgotPasswordDTO
{
    @IsEmail()
    @IsNotEmpty()
    email: string;
}