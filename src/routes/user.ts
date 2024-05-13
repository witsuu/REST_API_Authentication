import Elysia, { t } from "elysia";
import { UsersController } from "../controllers/usersController";
import { authorizationMiddleware } from "../middleware/authorization";

export function userRoutes(app: Elysia) {
    return app.guard({
        beforeHandle: authorizationMiddleware
    }, (app) =>
        app.get('/', UsersController.getAll)
            .get('/:userId', UsersController.getById, {
                params: t.Object({
                    userId: t.String({
                        error: 'userId must be a string'
                    }),
                })
            }))
}