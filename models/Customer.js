import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const customerSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: 2,
            maxlength: 100,

        },
        customerDescription: {
            type: String,
            required: true,
            trim: true,

            minlength: 2,
            maxlength: 100,
        },
        active: {
            type: Number,
            enum: Object.values(ACTIVE),
            default: ACTIVE.ACTIVE,
            index: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
