import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { USER_SCHEMA_NAME } from "../user/user.schema";

@Schema()
export class InviteToProjectToken
{
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, ref: USER_SCHEMA_NAME })
    issuer: Types.ObjectId;

    expires: Date;
    kind: string;
    token: string;
    _id: Types.ObjectId;
}

export type InviteToProjectTokenDocument = InviteToProjectToken & Document;
export const InviteToProjectTokenSchema = SchemaFactory.createForClass(InviteToProjectToken);