import mongoose from "mongoose";

export const db = {
    connect: () => mongoose.connect(process.env.MONGO_URL).catch(err => console.error(err))
};