import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, USER_SCHEMA_NAME } from '../../schemas/user/user.schema';

@Injectable()
export class UserService
{
    constructor(
        @InjectModel(USER_SCHEMA_NAME) private userModel: Model<User>
    )
    { }

    createUser(user: Partial<User>)
    {
        return this.userModel.create(user);
    }
}
