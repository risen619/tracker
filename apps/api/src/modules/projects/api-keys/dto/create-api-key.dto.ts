import { IsNotEmpty, Length } from "class-validator";

import { ICreateApiKeyDTO } from "@tracker/api-interfaces";

export class CreateApiKeyDTO implements ICreateApiKeyDTO
{
    @Length(2, 64)
    @IsNotEmpty()
    name: string;
}