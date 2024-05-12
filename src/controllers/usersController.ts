import Users from "../models/user"
import { Context, InternalServerError, NotFoundError } from 'elysia'

export const UsersController = {
    getAll: async () => {
        try {
            return await Users.find();
        } catch (error) {
            throw new InternalServerError();
        }
    },
    getById: async ({ params }: Context) => {
        const { userId } = params;

        try {
            const user = await Users.findById(userId);

            if (!user) throw new NotFoundError("User not found!");

            return user;
        } catch (error) {
            throw new InternalServerError();
        }
    }
}