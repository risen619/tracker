import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { SchemasModule } from '../../schemas/schemas.module';
import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';
import { SessionGuard } from './session.guard';

@Module({
    imports: [
        PassportModule.register({ session: true }),

        SchemasModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalAuthGuard,
        LocalStrategy,
        AuthSerializer,
        { provide: APP_GUARD, useClass: SessionGuard }
    ]
})
export class AuthModule { }
