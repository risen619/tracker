import { Module } from '@nestjs/common';

import { SchemasModule } from '../../schemas/schemas.module';

import { ApiKeysModule } from './api-keys/api-keys.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
    imports: [
        SchemasModule,
        ApiKeysModule
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule { }
