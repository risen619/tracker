import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import * as crypto from 'crypto';

import { IApiKeyModel } from "@tracker/models";

import { USER_SCHEMA_NAME } from "../user";
import { PROJECT_SCHEMA_NAME } from "../project";
import { API_KEY_LENGTH } from "./constants";

@Schema()
export class ApiKey implements IApiKeyModel<Types.ObjectId>
{
    @Prop({ required: true, ref: USER_SCHEMA_NAME })
    issuer: Types.ObjectId;

    @Prop({ required: true, unique: true })
    key: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, ref: PROJECT_SCHEMA_NAME })
    project: Types.ObjectId;

    _id: Types.ObjectId;
}

export type ApiKeyDocument = ApiKey & Document;
export const ApiKeySchema = SchemaFactory.createForClass(ApiKey);
export const API_KEY_SCHEMA_NAME = 'ApiKey';
export const API_KEY_COLLECTION_NAME = 'api-keys';

export interface ApiKeyModel extends Model<ApiKey>
{
    generateApiKey(): string;
}

ApiKeySchema.statics.generateApiKey = function()
{
    return crypto.randomBytes(API_KEY_LENGTH).toString('hex');
}