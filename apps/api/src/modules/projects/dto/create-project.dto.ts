import { IsNotEmpty, Length } from "class-validator";

import { ICreateProjectDTO } from "@tracker/api-interfaces";

export class CreateProjectDTO implements ICreateProjectDTO
{
    @Length(2, 128)
    @IsNotEmpty()
    name: string;
}