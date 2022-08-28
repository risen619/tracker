import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { IConfig } from '../../config/configuration';
import { User, USER_SCHEMA_NAME } from '../../schemas/user/user.schema';
import { Session, SESSION_SCHEMA_NAME } from '../../schemas/session/session.schema';
import { UsersService } from '../users/users.service';

import { RegisterDTO } from './dto';
import { ResetPasswordToken, RESET_PASSWORD_TOKEN_SCHEMA_NAME } from '../../schemas/token';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Injectable()
export class AuthService
{
    constructor(
        private config: ConfigService<IConfig>,

        @InjectModel(RESET_PASSWORD_TOKEN_SCHEMA_NAME) private resetPasswordTokenModel: Model<ResetPasswordToken>,
        @InjectModel(SESSION_SCHEMA_NAME) private sessionModel: Model<Session>,
        @InjectModel(USER_SCHEMA_NAME) private userModel: Model<User>,

        private userService: UsersService
    )
    { }

    async deleteSessions(user: User, currentSessionId: string)
    {
        return this.sessionModel.deleteMany({
            $and: [
                { 'session.passport.user.id': user._id.toString() },
                { _id: { $ne: currentSessionId } }
            ]
        });
    }

    async forgotPassword(email: string)
    {
        const user = await this.userModel.findOne({ email });

        if (!user)
            throw new NotFoundException('User with such email does not exist');

        const token = new this.resetPasswordTokenModel({
            expires: Date.now() + 1000 * 60 * 15,
            token: crypto.randomBytes(32).toString('hex'),
            user: user._id
        });

        token.save();
        return { token: token.token };
    }

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

    async resetPassword(dto: ResetPasswordDTO)
    {
        const token = await this.resetPasswordTokenModel.findOne({ token: dto.token });
        if (!token)
            throw new NotFoundException('Reset password link is invalid');

        token.remove();

        if (Date.now() > token.expires.valueOf())
            throw new GoneException('Reset password link is expired');

        const passwordHash = await bcrypt.hash(dto.password, this.config.get('auth.rounds', { infer: true }));
        await this.userModel.updateOne({ _id: token.user }, { $set: { passwordHash } });
        await this.sessionModel.deleteMany({ 'session.passport.user.id': token.user.toString() });
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
