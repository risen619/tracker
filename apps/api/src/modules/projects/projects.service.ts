import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { ProjectModel, PROJECT_SCHEMA_NAME } from '../../schemas/project';
import { User } from '../../schemas/user';

import { CreateProjectDTO } from './dto';

@Injectable()
export class ProjectsService
{
    constructor(
        @InjectModel(PROJECT_SCHEMA_NAME) private projectModel: ProjectModel
    )
    { }

    async create(dto: CreateProjectDTO, user: User)
    {
        return this.projectModel.create({
            apiKey: this.projectModel.generateApiKey(),
            name: dto.name,
            owner: user._id
        });
    }

    async list(user: User)
    {
        return this.projectModel.aggregate([
            { $match: { owner: user._id } }
        ]);
    }
}
