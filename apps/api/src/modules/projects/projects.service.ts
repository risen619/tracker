import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Project, PROJECT_SCHEMA_NAME } from '../../schemas/project';
import { User } from '../../schemas/user';

import { CreateProjectDTO } from './dto';

@Injectable()
export class ProjectsService
{
    constructor(
        @InjectModel(PROJECT_SCHEMA_NAME) private projectModel: Model<Project>
    )
    { }

    async create(dto: CreateProjectDTO, user: User)
    {
        const project = await this.projectModel.findOne({ slug: dto.slug });

        if (project)
            throw new ConflictException('Project with such URI already exists');

        return this.projectModel.create({
            owner: user._id,
            ...dto
        });
    }

    async delete(projectId: string)
    {
        return this.projectModel.deleteOne({ _id: new Types.ObjectId(projectId) });
    }

    async list(user: User)
    {
        return this.projectModel.aggregate([
            { $match: { owner: user._id } }
        ]);
    }
}
