import mongoose from "mongoose";
import { ACTION_VALUES, isValidActionArray } from "./enums.js";

/**
 * Per-user router-level permissions (optional overrides).
 * Lets you grant/deny actions for specific endpoints at user level.
 */
const routeEntrySchema = new mongoose.Schema(
    {
        routerEndpoint: {
            type: String, // e.g., "/user/attendance"
            required: true,
            trim: true,
        },
        permissionValues: {
            type: [Number], // actions allowed on this endpoint
            default: [1], // read by default
            validate: {
                validator: isValidActionArray,
                message: `permissionValues must be a subset of [${ACTION_VALUES.join(", ")}]`,
            },
        },
    },
    { _id: false }
);

const userRoutePermissionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        routes: {
            type: [routeEntrySchema],
            default: [],
        },
    },
    { timestamps: true }
);

// Prevent duplicate endpoint entries
userRoutePermissionSchema.pre("save", function (next) {
    const seen = new Set();
    for (const r of this.routes) {
        const key = r.routerEndpoint.trim().toLowerCase();
        if (seen.has(key)) {
            return next(new Error(`Duplicate routerEndpoint: ${r.routerEndpoint}`));
        }
        seen.add(key);
    }
    next();
});

export default mongoose.model("UserRoutePermission", userRoutePermissionSchema);
