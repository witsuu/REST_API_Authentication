import { Context } from 'elysia'
import { users } from "../services/users";

export const UsersController = {
    getAll: async () => {
        return await users.all();
    },
    getById: async ({ params }: Context) => {
        const { userId } = params;

        return await users.getById(userId);
    }
}