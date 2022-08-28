import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Document, Types, Model } from 'mongoose';
import * as crypto from 'crypto';

import { IProjectModel } from '@tracker/models';

import { USER_SCHEMA_NAME } from '../user/user.schema';

import { API_KEY_LENGTH } from './constants';

@Schema()
export class Project implements IProjectModel<Types.ObjectId>
{
    @Prop({ required: true })
    apiKey: string;

    @Prop({ required: true })
    name: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_SCHEMA_NAME })
    owner: Types.ObjectId;

    _id: Types.ObjectId;
}

export type ProjectDocument = Project & Document;
export const ProjectSchema = SchemaFactory.createForClass(Project);
export const PROJECT_SCHEMA_NAME = 'Project';
export const PROJECT_COLLECTION_NAME = 'projects';

export interface ProjectModel extends Model<Project>
{
    generateApiKey(): string;
}

ProjectSchema.statics.generateApiKey = function() {
    return crypto.randomBytes(API_KEY_LENGTH).toString('hex');
};