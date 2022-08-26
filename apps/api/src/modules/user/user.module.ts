import { Module } from '@nestjs/common';

import { SchemasModule } from '../../schemas/schemas.module';

import { UserService } from './user.service';

@Module({
    imports: [SchemasModule],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
