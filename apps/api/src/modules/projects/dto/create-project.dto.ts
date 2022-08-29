import { IsNotEmpty, Length, Matches } from "class-validator";

import { ICreateProjectDTO } from "@tracker/api-interfaces";

export class CreateProjectDTO implements ICreateProjectDTO
{
    @Length(2, 128)
    @IsNotEmpty()
    name: string;

    @Matches(/^[A-Za-z0-9\-_]+$/i)
    @Length(2, 128)
    @IsNotEmpty()
    slug: string;
}