import { Context } from "elysia";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import { users } from "../services/users";

export const authorizationMiddleware = async ({ jwt, cookie: { __SECRET_ATC } }: Context) => {
    const token = __SECRET_ATC.value;

    if (!token)
        throw new UnauthorizedError("Unauthorized")

    const id = await jwt.verify(token)
    const user = users.getById(id);

    if (!user)
        throw new UnauthorizedError("Unauthorized")
}