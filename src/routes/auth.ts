import Elysia, { t } from "elysia";
import { AuthController } from "../controllers/authController";

export function authRoutes(app: Elysia) {
    return app
        .post('/login', AuthController.login, {
            body: t.Object({
                email: t.String({
                    format: "email",
                    error: 'Invalid email'
                }),
                password: t.String()
            })
        })
        .post('/register', AuthController.register, {
            body: t.Object({
                username: t.String(),
                email: t.String({
                    format: "email",
                    error: 'Invalid email'
                }),
                password: t.String()
            })
        })
}