import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import * as session from 'express-session';
import { Connection } from 'mongoose';
import * as passport from 'passport';
import MongoStore = require('connect-mongo');

import { configuration, IConfig } from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SESSION_COLLECTION_NAME } from './schemas/session/session.schema';
import { ProjectsModule } from './modules/projects/projects.module';

function buildMongoUri(host: string, port: number, name: string)
{
    return `mongodb://${host}:${port}/${name}`;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService<IConfig>) =>
            {
                const { host, name, port } = config.get('database', { infer: true });
                return { uri: buildMongoUri(host, port, name) };
            },
        }),

        AuthModule,
        UsersModule,
        ProjectsModule,
    ],
})
export class AppModule implements NestModule
{
    constructor(
        @InjectConnection() private connection: Connection,
        private config: ConfigService<IConfig>
    ) { }

    configure(consumer: MiddlewareConsumer)
    {
        consumer
            .apply(
                session({
                    secret: this.config.get('auth.secret', { infer: true }),
                    resave: true,
                    saveUninitialized: false,
                    rolling: true,
                    cookie: {
                        maxAge: 1000 * 60 * 60 * 24 * 14,
                        secure: false,
                        httpOnly: false,
                    },
                    store: MongoStore.create({
                        client: this.connection.getClient(),
                        collectionName: SESSION_COLLECTION_NAME,
                        stringify: false,
                    }),
                }),
                passport.initialize(),
                passport.session()
            )
            .forRoutes('*');
    }
}
