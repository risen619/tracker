import { Module } from '@nestjs/common';

import { SchemasModule } from 'apps/api/src/schemas/schemas.module';

import { ApiKeysController } from './api-keys.controller';
import { ApiKeysService } from './api-keys.service';

@Module({
    imports: [SchemasModule],
    controllers: [ApiKeysController],
    providers: [ApiKeysService],
})
export class ApiKeysModule { }
