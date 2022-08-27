import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Public } from '../../decorators';

import { ForgotPasswordDTO, RegisterDTO } from './dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from '../../schemas/user/user.schema';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController
{
    constructor(private service: AuthService) { }

    @Public()
    @Post('forgot-password')
    forgotPassword(@Body() body: ForgotPasswordDTO)
    {
        return this.service.forgotPassword(body.email);
    }

    @Get('sessions')
    getSessions(@Req() request: Request)
    {
        const user = request.user as User;
        return this.service.getSessions(user._id.toString());
    }

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login() { }

    @Public()
    @Post('register')
    register(@Body() body: RegisterDTO)
    {
        return this.service.register(body);
    }

    @Public()
    @Post('reset-password')
    resetPassword(@Body() body: ResetPasswordDTO)
    {
        return this.service.resetPassword(body);
    }
}
