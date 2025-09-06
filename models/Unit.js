import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const unitSchema = new mongoose.Schema(
    {
        unitName: {
            type: String,
            required: true,
            trim: true,
            unique: true,

        },
        unitValue: {
            type: String,
            required: true
        },
        active: {
            type: Number,
            enum: Object.values(ACTIVE),
            default: ACTIVE.ACTIVE,

        },
    },
    { timestamps: true }
);

export default mongoose.model("Unit", unitSchema);
