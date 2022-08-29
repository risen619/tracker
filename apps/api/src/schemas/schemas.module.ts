import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ApiKeySchema, API_KEY_COLLECTION_NAME, API_KEY_SCHEMA_NAME } from "./api-key";
import { ProjectSchema, PROJECT_COLLECTION_NAME, PROJECT_SCHEMA_NAME } from "./project/project.schema";
import { SessionSchema, SESSION_COLLECTION_NAME, SESSION_SCHEMA_NAME } from "./session/session.schema";
import { InviteToProjectTokenSchema, INVITE_TO_PROJECT_TOKEN_SCHEMA_NAME, ResetPasswordTokenSchema, RESET_PASSWORD_TOKEN_SCHEMA_NAME, TokenSchema, TOKEN_COLLECTION_NAME, TOKEN_SCHEMA_NAME } from "./token";
import { UserSchema, USER_COLLECTION_NAME, USER_SCHEMA_NAME } from "./user/user.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: API_KEY_SCHEMA_NAME, schema: ApiKeySchema, collection: API_KEY_COLLECTION_NAME },
            { name: PROJECT_SCHEMA_NAME, schema: ProjectSchema, collection: PROJECT_COLLECTION_NAME },
            { name: SESSION_SCHEMA_NAME, schema: SessionSchema, collection: SESSION_COLLECTION_NAME },
            {
                name: TOKEN_SCHEMA_NAME,
                schema: TokenSchema,
                collection: TOKEN_COLLECTION_NAME,
                discriminators: [
                    { name: RESET_PASSWORD_TOKEN_SCHEMA_NAME, schema: ResetPasswordTokenSchema },
                    { name: INVITE_TO_PROJECT_TOKEN_SCHEMA_NAME, schema: InviteToProjectTokenSchema }
                ]
            },
            { name: USER_SCHEMA_NAME, schema: UserSchema, collection: USER_COLLECTION_NAME },
        ])
    ],
    exports: [MongooseModule]
})
export class SchemasModule { }