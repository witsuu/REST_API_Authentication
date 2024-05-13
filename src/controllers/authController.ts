import { Context } from "elysia";
import Users, { IUser } from "../models/Users";
import { authenticate } from '../services/authenticate'
import { BadRequestError } from "../exceptions/BadRequestError";

export const AuthController = {
    login: async ({ body, jwt, cookie: { __SECRET_ATC } }: Context) => {
        const { email, password } = body as IUser;

        const user = await authenticate.verifyEmail(email);

        await authenticate.verifyPass(password, user.password);

        const access_token = await jwt.sign(user.id);

        __SECRET_ATC.set({
            value: access_token,
            httpOnly: true,
            expires: new Date(Date.now() + 1 * 3600000)
        })

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