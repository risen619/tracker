import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { IS_PUBLIC_KEY } from '../../decorators';

@Injectable()
export class SessionGuard implements CanActivate
{
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>
    {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
        if (isPublic) return true;

        const request: Request = context.switchToHttp().getRequest();
        const isAuthenticated = request.isAuthenticated();

        if (isAuthenticated)
        {
            (<any>request.session).agent = request.header('user-agent');
            (<any>request.session).ip = request.ip;
            
            return true;
        }
        else
            throw new UnauthorizedException();
    }
}
