import { IsNotEmpty, Length } from "class-validator";

import { IResetPasswordDTO } from "@tracker/api-interfaces";

export class ResetPasswordDTO implements IResetPasswordDTO
{
    @Length(8, 20)
    @IsNotEmpty()
    password: string;

    @Length(32)
    @IsNotEmpty()
    token: string;
}