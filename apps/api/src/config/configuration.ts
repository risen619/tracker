export interface IConfig
{
    app: {
        port: number
    };

    auth: {
        rounds: number,
        secret: string
    };

    database: {
        host: string,
        port: number,
        name: string
    };
}

export function configuration(): IConfig
{
    return {
        app: {
            port: parseInt(process.env.APP_PORT, 10)
        },
        auth: {
            rounds: parseInt(process.env.AUTH_ROUNDS, 10),
            secret: process.env.AUTH_SECRET
        },
        database: {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            name: process.env.DB_NAME,
        }
    };
}