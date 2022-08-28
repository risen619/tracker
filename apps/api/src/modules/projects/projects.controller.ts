import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateProjectDTO } from './dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController
{
    constructor(private service: ProjectsService) { }

    @Post()
    create(@Body() body: CreateProjectDTO, @Req() request: Request)
    {
        return this.service.create(body, request.user);
    }

    @Get()
    list(@Req() request: Request)
    {
        return this.service.list(request.user);
    }
}
