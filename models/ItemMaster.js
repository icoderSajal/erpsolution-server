import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";
const itemSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },

        subcategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
        },
        itemCode: {
            type: String,
            required: true,
        },
        itemName: {
            type: String,
            required: true
        },
        unitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Unit",
        },
        openingRate: {
            type: Number,
            required: true,

        },
        mainRate: {
            type: Number,
            required: true,

        },
        hsnNo: {
            type: String,
            required: true,

        },
        minOrder: {
            type: Number,
            required: true,

        },
        batchNo: {
            type: String,
            required: true,

        },

        active: {
            type: Number,
            enum: Object.values(ACTIVE),
            default: ACTIVE.ACTIVE,

        },
        itemImage: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("ItemMaster", itemSchema);
