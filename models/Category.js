import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const categorySchema = new mongoose.Schema(
    {
        catgoryCode: {
            type: String,
            required: true,


        },
        catgoryName: {
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

export default mongoose.model("Category", categorySchema);
