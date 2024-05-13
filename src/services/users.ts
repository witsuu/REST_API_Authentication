import { NotFoundError } from "elysia";
import Users from "../models/Users";

export const users = {
    all: async () => {
        const users = await Users.find();

        if (!users)
            throw new NotFoundError("Users not found");

        return users;
    },
    getById: async (userId: string) => {
        const user = await Users.findOne({ _id: userId }).select("username email");

        if (!user)
            throw new NotFoundError("User not found");

        return JSON.stringify(user);
    }
}