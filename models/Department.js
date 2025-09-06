import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const departmentSchema = new mongoose.Schema(
    {
        deparmentName: {
            type: String,
            required: true,
            trim: true,
            unique: true, // e.g., "HR","Sales","Admin"
            minlength: 2,
            maxlength: 100,
            index: true,
        },
        defaultPermission: {
            type: Number,
            enum: [0, 1], // 0 = no permission, 1 = permission (default allow)
            default: 1,
        },
        departmentActive: {
            type: Number,
            enum: Object.values(ACTIVE),
            default: ACTIVE.ACTIVE,
            index: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Department", departmentSchema);
