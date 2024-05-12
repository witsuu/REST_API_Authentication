import { NotFoundError } from "elysia";
import Users from "../models/user"
import { BadRequestError } from "../exceptions/BadRequestError";

export const authenticate = {
    verifyEmail: async (email: string) => {
        const user = await Users.findOne({ email });

        if (!user)
            throw new NotFoundError("Incorrect Email");

        return user;
    },
    verifyPass: async (password: string, hashPassword: string) => {
        const verifyPass = await Bun.password.verify(password, hashPassword);

        if (!verifyPass)
            throw new NotFoundError("Incorrect Password")
    },
    verifyEmailExists: async (email: string) => {
        const user = await Users.findOne({ email });

        if (user)
            throw new BadRequestError("Email already exists");
    },
    hashPassword: async (password: string) => {
        return await Bun.password.hash(password, {
            algorithm: 'bcrypt',
            cost: 8
        })
    }
}