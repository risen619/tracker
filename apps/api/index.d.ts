import { User } from "./src/schemas/user";

declare module 'express' {
    interface Request {
        user?: User;
    }
}