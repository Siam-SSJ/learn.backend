import mongoose, { Schema } from "mongoose";
import { User } from "./user.model";

const subscriptionSchema = new Schema({
    subscriber: {
        type: User.Types.Object_id, // one who is subscribing 
        ref: "User"
    },
    channel: {
        type: User.Types.Object_id,
        ref: "User"
    }
},
{ timestamps: true })


export const subscription = mongoose.model("subscription",subscriptionSchema)
