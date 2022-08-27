import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

import { INVITE_TO_PROJECT_TOKEN_SCHEMA_NAME, RESET_PASSWORD_TOKEN_SCHEMA_NAME } from "./contants";

@Schema({ discriminatorKey: 'kind' })
export class Token
{
    @Prop({ required: true })
    expires: Date;

    @Prop({
        required: true,
        type: String,
        enum: [RESET_PASSWORD_TOKEN_SCHEMA_NAME, INVITE_TO_PROJECT_TOKEN_SCHEMA_NAME]
    })
    kind: string;

    @Prop({ required: true })
    token: string;

    _id: Types.ObjectId;
}

export type TokenDocument = Token & Document;
export const TokenSchema = SchemaFactory.createForClass(Token);