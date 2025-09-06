import mongoose from "mongoose";
import { ACTIVE } from "./enums.js";

const permissionSchema = new mongoose.Schema(
    {

        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppModule",
            required: true
        },
        permissionName: {
            type: String,
            required: true,
            trim: true,
            unique: true, // e.g., "Attendance", "Leaves", "Create User", "Delete User"
            minlength: 2,
            maxlength: 100,
            index: true,
        },
        defaultPermission: {
            type: Number,
            enum: [0, 1], // 0 = no permission, 1 = permission (default allow)
            default: 0,
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

export default mongoose.model("Permission", permissionSchema);
