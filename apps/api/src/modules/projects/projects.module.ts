import { Module } from '@nestjs/common';

import { SchemasModule } from '../../schemas/schemas.module';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

@Module({
    imports: [SchemasModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule { }
