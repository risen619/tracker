import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { IProjectModel } from '@tracker/models';

import { USER_SCHEMA_NAME } from '../user/user.schema';

@Schema({ _id: false })
class ProjectInvitation
{
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, ref: USER_SCHEMA_NAME })
    issuer: Types.ObjectId;
}

@Schema({ _id: false })
class ProjectUser
{
    @Prop({ required: true, ref: USER_SCHEMA_NAME })
    user: Types.ObjectId;
}

@Schema()
export class Project implements IProjectModel<Types.ObjectId>
{
    @Prop([ProjectInvitation])
    invitations: ProjectInvitation[];

    @Prop({ required: true })
    name: string;

    @Prop({ type: Types.ObjectId, ref: USER_SCHEMA_NAME })
    owner: Types.ObjectId;

    @Prop({ required: true, unique: true })
    slug: string;

    @Prop([ProjectUser])
    users: ProjectUser[];

    _id: Types.ObjectId;
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
export const PROJECT_SCHEMA_NAME = 'Project';
export const PROJECT_COLLECTION_NAME = 'projects';

export interface ProjectModel extends Model<Project> { }
