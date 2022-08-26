import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { IConfig } from './config/configuration';

async function bootstrap()
{
    const app = await NestFactory.create(AppModule);
    const globalPrefix = 'api';
    const config = app.get(ConfigService<IConfig>);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix(globalPrefix);

    const port = config.get('app.port', { infer: true });
    await app.listen(port);

    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
