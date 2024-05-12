import { Context } from "elysia";
import Users, { IUser } from "../models/user";
import { authenticate } from '../services/authenticate'
import { BadRequestError } from "../exceptions/BadRequestError";

export const AuthController = {
    login: async ({ body }: Context) => {
        const { email, password } = body as IUser;

        const user = await authenticate.verifyEmail(email);

        await authenticate.verifyPass(password, user.password);

        return {
            message: "user has successfully logged in"
        }
    },
    register: async ({ body }: Context) => {
        const { username, email, password } = body as IUser;

        await authenticate.verifyEmailExists(email);

        const hashPassword = await authenticate.hashPassword(password);

        const user = await Users.create({
            username,
            email,
            password: hashPassword
        })

        if (!user)
            throw new BadRequestError("New user data failed to save")

        return {
            message: "New user saved successfully"
        }
    }
}