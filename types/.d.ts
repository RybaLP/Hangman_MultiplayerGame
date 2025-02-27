import mongoose, { mongo } from "mongoose";

declare global {
    namespace globalThis{
        var mongoose : {
            conn : mongoose.Mongoose | null;
            promise : Promise<mongoose.Mongoose> | null;
        }
    }
}