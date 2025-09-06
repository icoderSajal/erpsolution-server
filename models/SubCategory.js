import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const subcategorySchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        subcatgoryCode: {
            type: String,
            required: true,
        },
        subcatgoryName: {
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

export default mongoose.model("SubCategory", subcategorySchema);
