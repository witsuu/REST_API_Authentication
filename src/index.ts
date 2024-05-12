import Elysia from "elysia";
import { db } from "./config/db";
import swagger from "@elysiajs/swagger";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import cors from "@elysiajs/cors";
import { BadRequestError } from "./exceptions/BadRequestError";

const app = new Elysia();

const PORT = process.env.PORT || 3500;

app.use(swagger())
    .use(cors())
    .error('BAD_REQUEST', BadRequestError)
    .onError(({ code, error, set }) => {
        switch (code) {
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

db.connect().then(() => app.listen(PORT, () => console.log(`Server is running on ${PORT}`)))