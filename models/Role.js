import mongoose from "mongoose";
import { ROLE, ACTIVE } from "./enums.js";

const roleSchema = new mongoose.Schema(
    {
        roleName: {
            type: String,
            required: true,
            enum: ["user", "admin", "hradmin", "manager", "supervisor","sub-admin"],
            unique: true,
            trim: true,
        },
        roleValue: {
            type: Number,
            required: true,
            enum: Object.values(ROLE),
            unique: true,
            index: true,
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

export default mongoose.model("Role", roleSchema);
