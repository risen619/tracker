import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDTO } from './dto';

@Controller()
export class ApiKeysController
{
    constructor(private service: ApiKeysService) {}

    @Post()
    create(@Param('projectId') projectId: string, @Body() body: CreateApiKeyDTO, @Req() request: Request)
    {
        return this.service.create(body, projectId, request.user);
    }

    @Delete(':id')
    delete(@Param('projectId') projectId: string, @Param('id') keyId: string, @Req() request: Request)
    {
        this.service.delete(projectId, keyId, request.user);
    }

    @Get()
    list(@Param('projectId') projectId: string, @Req() request: Request)
    {
        return this.service.list(projectId, request.user);
    }
}
