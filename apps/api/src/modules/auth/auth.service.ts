import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { IConfig } from '../../config/configuration';
import { User, USER_SCHEMA_NAME } from '../../schemas/user/user.schema';
import { Session, SESSION_SCHEMA_NAME } from '../../schemas/session/session.schema';
import { UserService } from '../user/user.service';

import { RegisterDTO } from './dto';

@Injectable()
export class AuthService
{
    constructor(
        private config: ConfigService<IConfig>,

        @InjectModel(SESSION_SCHEMA_NAME) private sessionModel: Model<Session>,
        @InjectModel(USER_SCHEMA_NAME) private userModel: Model<User>,

        private userService: UserService
    )
    { }

    async getSessions(userId: string)
    {
        return this.sessionModel.aggregate([
            { $match: { 'session.passport.user.id': userId } },
            { $project: { _id: 0, agent: '$session.agent', ip: '$session.ip' } }
        ]);
    }

    async register(dto: RegisterDTO)
    {
        const passwordHash = await bcrypt.hash(dto.password, this.config.get('auth.rounds', { infer: true }));
        return this.userService.createUser({ email: dto.email, passwordHash });
    }

    async validateUser(email: string, password: string)
    {
        const user = await this.userModel.findOne({ email });
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if (passwordMatch)
            return user;

        return null;
    }
}
