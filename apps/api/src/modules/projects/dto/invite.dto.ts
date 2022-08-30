import { IsEmail, IsNotEmpty } from "class-validator";

import { IInviteDTO } from "@tracker/api-interfaces";

export class InviteDTO implements IInviteDTO
{
    @IsEmail()
    @IsNotEmpty()
    email: string;
}