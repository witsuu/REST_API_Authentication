import Elysia from "elysia";
import swagger from "@elysiajs/swagger";
import { userRoutes } from "../routes/user";
import { authRoutes } from "../routes/auth";
import cors from "@elysiajs/cors";
import { BadRequestError } from "../exceptions/BadRequestError";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import { ForbiddenError } from "../exceptions/ForbiddenError";
import bearer from "@elysiajs/bearer";
import jwt from "@elysiajs/jwt";

export const app = new Elysia();

app.use(swagger())
    .use(cors())
    .use(bearer())
    .use(jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET,
        exp: '1d'
    }))
    .use(jwt({
        name: "refreshJwt",
        secret: process.env.JWT_SECRET_REFRESH
    }))
    .derive(async ({ jwt, cookie: { __SECRET_ATC } }) => {
        const userId = await jwt.verify(__SECRET_ATC.value);

        return {
            userId
        }
    })
    .error('BAD_REQUEST', BadRequestError)
    .error('UNAUTHORIZED', UnauthorizedError)
    .error('FORBIDDEN', ForbiddenError)
    .onError(({ code, error, set }) => {
        switch (code) {
            case "UNAUTHORIZED":
                set.status = 401;
                return {
                    status: 'error',
                    message: error.toString()
                }
            case "FORBIDDEN":
                set.status = 403;
                return {
                    status: 'error',
                    message: error.toString()
                }
            case "BAD_REQUEST":
                set.status = 400;
                return {
                    status: 'error',
                    message: error.toString()
                }
            case 'INTERNAL_SERVER_ERROR':
                set.status = 500;
                return {
                    status: "error",
                    message: "Something went wrong!"
                }
        }
    })
    .group('/user', (app) => app.use(userRoutes))
    .group('/auth', (app) => app.use(authRoutes))