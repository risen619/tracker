import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ProjectSchema, PROJECT_COLLECTION_NAME, PROJECT_SCHEMA_NAME } from "./project/project.schema";
import { SessionSchema, SESSION_COLLECTION_NAME, SESSION_SCHEMA_NAME } from "./session/session.schema";
import { UserSchema, USER_COLLECTION_NAME, USER_SCHEMA_NAME } from "./user/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PROJECT_SCHEMA_NAME, schema: ProjectSchema, collection: PROJECT_COLLECTION_NAME },
            { name: SESSION_SCHEMA_NAME, schema: SessionSchema, collection: SESSION_COLLECTION_NAME },
            { name: USER_SCHEMA_NAME, schema: UserSchema, collection: USER_COLLECTION_NAME },
        ])
    ],
    exports: [MongooseModule]
})
export class SchemasModule { }