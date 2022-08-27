import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { USER_SCHEMA_NAME } from "../user";

@Schema()
export class ResetPasswordToken
{
    @Prop({ required: true, ref: USER_SCHEMA_NAME })
    user: Types.ObjectId;

    expires: Date;
    kind: string;
    token: string;
    _id: Types.ObjectId;
}

export type ResetPassswordTokenDocument = ResetPasswordToken & Document;
export const ResetPasswordTokenSchema = SchemaFactory.createForClass(ResetPasswordToken);