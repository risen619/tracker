import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';

import { IUserModel } from '@tracker/models';

@Schema()
export class User implements IUserModel<Types.ObjectId>
{
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string;

    _id: Types.ObjectId;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const USER_SCHEMA_NAME = 'User';
export const USER_COLLECTION_NAME = 'users';
export interface UserModel extends Model<User> { }