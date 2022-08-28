import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { Public } from '../../decorators';
import { User } from '../../schemas/user/user.schema';

import { AuthService } from './auth.service';
import { ForgotPasswordDTO, RegisterDTO, ResetPasswordDTO } from './dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController
{
    constructor(private service: AuthService) { }

    @Delete('sessions')
    deleteSessions(@Req() request: Request)
    {
        this.service.deleteSessions(request.user as User, request.sessionID);
    }

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

    @Delete('logout')
    logout(@Req() request: Request)
    {
        request.session.destroy(console.log);
    }

    @Public()
    @Post('register')
    register(@Body() body: RegisterDTO)
    {
        return this.service.register(body);
    }

    @Public()
    @Post('reset-password')
    async resetPassword(@Req() request: Request, @Body() body: ResetPasswordDTO)
    {
        const res = await this.service.resetPassword(body);

        if (request.session?.destroy)
            request.session.destroy(console.log);

        return res;
    }
}
