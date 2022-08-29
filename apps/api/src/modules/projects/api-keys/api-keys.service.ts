import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { ApiKeyModel, API_KEY_SCHEMA_NAME } from 'apps/api/src/schemas/api-key';
import { ProjectModel, PROJECT_SCHEMA_NAME } from 'apps/api/src/schemas/project';
import { User } from 'apps/api/src/schemas/user';

import { CreateApiKeyDTO } from './dto';

@Injectable()
export class ApiKeysService
{
    constructor(
        @InjectModel(PROJECT_SCHEMA_NAME) private projectModel: ProjectModel,
        @InjectModel(API_KEY_SCHEMA_NAME) private apiKeyModel: ApiKeyModel
    )
    { }

    async create(dto: CreateApiKeyDTO, projectId: string, user: User)
    {
        const [project, existingApiKey] = await Promise.all([
            this.projectModel.findOne({ _id: new Types.ObjectId(projectId) }),
            this.apiKeyModel.findOne({ project: new Types.ObjectId(projectId), name: dto.name })
        ]);

        if (!project)
            throw new NotFoundException('Project does not exist');

        if (!project.owner.equals(user._id))
            throw new ForbiddenException('You cannot create API keys for this project');

        if (existingApiKey)
            throw new ConflictException('API key already exists');

        return this.apiKeyModel.create({
            issuer: user._id,
            key: this.apiKeyModel.generateApiKey(),
            name: dto.name,
            project: project._id
        });
    }

    async delete(projectId: string, keyId: string, user: User)
    {
        const project = await this.projectModel.findOne({ _id: new Types.ObjectId(projectId) });

        if (!project)
            throw new NotFoundException('Project does not exist');

        if (!project.owner.equals(user._id))
            throw new ForbiddenException('You cannot delete API keys from this project');

        return this.apiKeyModel.deleteOne({ _id: new Types.ObjectId(keyId) });
    }

    async list(projectId: string, user: User)
    {
        const project = await this.projectModel.findOne({ _id: new Types.ObjectId(projectId) });

        if (!project)
            throw new NotFoundException('Project does not exist');

        if (!project.owner.equals(user._id))
            throw new ForbiddenException('You cannot view API keys from this project');

        return this.apiKeyModel.aggregate([
            { $match: { project: project._id } }
        ]);
    }
}
