import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { ProjectModel, PROJECT_SCHEMA_NAME } from '../../schemas/project';
import { InviteToProjectTokenModel, INVITE_TO_PROJECT_TOKEN_SCHEMA_NAME } from '../../schemas/token';
import { User, UserModel, USER_COLLECTION_NAME, USER_SCHEMA_NAME } from '../../schemas/user';

import { AcceptInviteDTO, CreateProjectDTO, InviteDTO } from './dto';

@Injectable()
export class ProjectsService
{
    constructor(
        @InjectModel(PROJECT_SCHEMA_NAME) private projectModel: ProjectModel,
        @InjectModel(INVITE_TO_PROJECT_TOKEN_SCHEMA_NAME) private invitationTokenModel: InviteToProjectTokenModel,
        @InjectModel(USER_SCHEMA_NAME) private userModel: UserModel
    )
    { }

    async acceptInvite(dto: AcceptInviteDTO, user: User)
    {
        const token = await this.invitationTokenModel.findOne({ token: dto.token });

        if (token.email !== user.email)
            throw new ForbiddenException('You cannot use this invitation link');

        if (!token || (Date.now() > token.expires.valueOf()))
            throw new NotFoundException('Invitation link is expired');

        const project = await this.projectModel.findOne({ _id: token.project });

        project.invitations = project.invitations.filter(i => i.email !== user.email);
        project.users.push({ user: user._id });

        await Promise.all([project.save(), token.delete()]);
    }

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

    async invite(projectId: string, dto: InviteDTO, user: User)
    {
        const project = await (
            this.projectModel.findById(new Types.ObjectId(projectId))
                .populate('users.user')
        );

        if (!project)
            throw new NotFoundException('Project does not exist');

        if (!project.owner.equals(user._id))
            throw new ForbiddenException('You cannot invite users to this project');

        if ((project.users as any as { user: User }[]).find(({ user: u }) => u.email == dto.email))
            throw new ConflictException('This user is already invited');

        if (project.invitations.find(i => i.email == dto.email))
            throw new ConflictException('This user is already invited');

        project.invitations.push({ email: dto.email, issuer: user._id });
        const token = new this.invitationTokenModel({
            email: dto.email,
            expires: Date.now() + 1000 * 60 * 60 * 24,
            project: project._id,
            token: this.invitationTokenModel.generateToken()
        });

        await Promise.all([project.save(), token.save()]);
        return { token: token.token };
    }

    async list(user: User)
    {
        return this.projectModel.aggregate([
            { $match: { owner: user._id } }
        ]);
    }
}
