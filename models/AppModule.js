import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const appmoduleSchema = new mongoose.Schema(
    {
        moduleName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: 2,
            maxlength: 100,
        },
        modulePath: {
            type: String,
            required: true,
            trim: true,
        },
        active: {
            type: Number,
            enum: Object.values(ACTIVE),
            default: ACTIVE.ACTIVE,
        },
    },
    { timestamps: true }
);

export default mongoose.model("AppModule", appmoduleSchema);
