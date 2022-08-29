import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateProjectDTO } from './dto';
import { ProjectsService } from './projects.service';

@Controller()
export class ProjectsController
{
    constructor(private service: ProjectsService) { }

    @Post()
    create(@Body() body: CreateProjectDTO, @Req() request: Request)
    {
        return this.service.create(body, request.user);
    }

    @Delete(':id')
    delete(@Param('id') id: string)
    {
        return this.service.delete(id)
            .then(() => {});
    }

    @Get()
    list(@Req() request: Request)
    {
        return this.service.list(request.user);
    }
}
