namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: string;
        PORT: number;
        MONGO_URL: string;
        JWT_SECRET: string;
        JWT_SECRET_REFRESH: string;
    }
}