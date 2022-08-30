import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Model, Types } from "mongoose";
import * as crypto from 'crypto';

import { PROJECT_SCHEMA_NAME } from "../project";

import { TOKEN_LENGTH } from "./contants";

@Schema()
export class InviteToProjectToken
{
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, ref: PROJECT_SCHEMA_NAME })
    project: Types.ObjectId;

    expires: Date;
    kind: string;
    token: string;
    _id: Types.ObjectId;
}

export type InviteToProjectTokenDocument = InviteToProjectToken & Document;
export const InviteToProjectTokenSchema = SchemaFactory.createForClass(InviteToProjectToken);
export interface InviteToProjectTokenModel extends Model<InviteToProjectToken>
{
    generateToken(): string;
}

InviteToProjectTokenSchema.statics.generateToken = function()
{
    return crypto.randomBytes(TOKEN_LENGTH).toString('hex');
}