import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Public } from '../../decorators';

import { RegisterDTO } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../../schemas/user/user.schema';

@Controller('auth')
export class AuthController
{
    constructor(private service: AuthService) { }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login() { }

    @Public()
    @Post('register')
    async register(@Body() body: RegisterDTO)
    {
        return this.service.register(body);
    }

    @Get('sessions')
    async getSessions(@Req() request: Request)
    {
        const user = request.user as User;
        return this.service.getSessions(user._id.toString());
    }
}
