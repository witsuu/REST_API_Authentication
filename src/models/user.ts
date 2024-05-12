import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    updated_at?: Date;
}

const UserScheme = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model<IUser>('Users', UserScheme);