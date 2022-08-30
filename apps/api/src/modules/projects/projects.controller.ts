import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateProjectDTO } from './dto';
import { AcceptInviteDTO } from './dto/accept-invite.dto';
import { InviteDTO } from './dto/invite.dto';
import { ProjectsService } from './projects.service';

@Controller()
export class ProjectsController
{
    constructor(private service: ProjectsService) { }

    @Post('accept-invite')
    acceptInvite(@Req() request: Request, @Body() body: AcceptInviteDTO)
    {
        return this.service.acceptInvite(body, request.user);
    }

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

    @Post(':id/invite')
    invite(@Param('id') id: string, @Body() body: InviteDTO, @Req() request: Request)
    {
        return this.service.invite(id, body, request.user);
    }

    @Get()
    list(@Req() request: Request)
    {
        return this.service.list(request.user);
    }
}
