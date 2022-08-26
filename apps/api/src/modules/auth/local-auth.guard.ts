import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local')
{
    async canActivate(context: ExecutionContext)
    {
        const result = (await super.canActivate(context)) as boolean;
        const request: Request = context.switchToHttp().getRequest();

        await super.logIn(request);
        
        (<any>request.session).agent = request.header('user-agent');
        (<any>request.session).ip = request.ip;

        return result;
    }
}
