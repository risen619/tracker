import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportSerializer } from '@nestjs/passport';
import { Model } from 'mongoose';

import { User, USER_SCHEMA_NAME } from '../../schemas/user/user.schema';

interface IPayload
{
    id: string;
}

@Injectable()
export class AuthSerializer extends PassportSerializer
{
    constructor(@InjectModel(USER_SCHEMA_NAME) private userModel: Model<User>)
    {
        super();
    }

    serializeUser(user: User, done: (err: Error, payload: IPayload) => void)
    {
        return done(null, { id: user._id.toString() });
    }

    async deserializeUser(payload: IPayload, done: (err: Error, user: User) => void)
    {
        const user = await this.userModel.findById(payload.id);
        done(null, user);
    }
    
}
