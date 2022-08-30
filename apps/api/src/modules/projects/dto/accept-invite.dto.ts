import { IsNotEmpty, Length } from "class-validator";

import { IAcceptInviteDTO } from "@tracker/api-interfaces";

import { TOKEN_LENGTH } from "apps/api/src/schemas/token";

export class AcceptInviteDTO implements IAcceptInviteDTO
{
    @Length(TOKEN_LENGTH)
    @IsNotEmpty()
    token: string;
}