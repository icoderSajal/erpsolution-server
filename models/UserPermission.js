import mongoose from "mongoose";
import { ACTION_VALUES, isValidActionArray } from "./enums.js";

/**
 * Per-user module permissions.
 * Each entry describes what actions the user can do for a given permission/module.
 */
const permissionEntrySchema = new mongoose.Schema(
    {
        permissionName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        // Allowed actions for this permission/module (0=create,1=read,2=edit,3=delete)
        permissionValues: {
            type: [Number],
            default: [1], // read by default
            validate: {
                validator: isValidActionArray,
                message: `permissionValues must be a subset of [${ACTION_VALUES.join(", ")}]`,
            },
        },
    },
    { _id: false }
);

const userPermissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        permissions: {
            type: [permissionEntrySchema],
            default: [],
        },
    },
    { timestamps: true }
);

// Optional: ensure no duplicate permissionName entries inside the array
userPermissionSchema.pre("save", function (next) {
    const names = new Set();
    for (const p of this.permissions) {
        const key = p.permissionName.toLowerCase();
        if (names.has(key)) {
            return next(new Error(`Duplicate permissionName: ${p.permissionName}`));
        }
        names.add(key);
    }
    next();
});

export default mongoose.model("UserPermission", userPermissionSchema);
