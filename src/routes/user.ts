import Elysia, { t } from "elysia";
import { UsersController } from "../controllers/usersController";

export function userRoutes(app: Elysia) {
    return app
        .get('/', UsersController.getAll)
        .get('/:userId', UsersController.getById, {
            params: t.Object({
                userId: t.String({
                    error: 'userId must be a string'
                }),
            })
        })
}