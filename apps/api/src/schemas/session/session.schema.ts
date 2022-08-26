import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ _id: false })
export class Passport
{
    @Prop({ required: true, type: { id: String } })
    user: { id: String };
}

@Schema({ _id: false })
export class InnerSession
{
    @Prop({ required: true })
    agent: string;

    @Prop({ required: true })
    ip: string;

    @Prop({ required: true, type: Passport })
    passport: Passport;
}

@Schema()
export class Session
{
    @Prop({ required: true })
    expires: Date;

    @Prop({ required: true, type: InnerSession })
    session: InnerSession;

    _id: string;
}

export type SessionDocument = Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
export const SESSION_SCHEMA_NAME = 'Session';
export const SESSION_COLLECTION_NAME = 'sessions';