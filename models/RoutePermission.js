import mongoose from "mongoose";
import { ROLE, ACTION_VALUES, isValidActionArray } from "./enums.js";

/**
 * Role-based permissions for specific routes.
 * Example: { "/admin/addrole", roleValue: 1 (ADMIN), permissionId: <Permission._id>, permissionValues: [0,1,2,3] }
 */
const routePermissionSchema = new mongoose.Schema(
    {
        moduleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AppModule",
            required: true,

        },

        routerEndpoint: {
            type: String,
            required: true,
            trim: true,
        },
        roleValue: {
            type: Number,
            required: true,
            enum: Object.values(ROLE),
            index: true,
        },
        permissionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission",
            required: true,
            index: true,
        },
        // Actions allowed for this role on this endpoint
        permissionValues: {
            type: [Number],
            default: [1], // read by default
            validate: {
                validator: isValidActionArray,
                message: `permissionValues must be a subset of [${ACTION_VALUES.join(", ")}]`,
            },
        },
    },
    { timestamps: true }
);

// Unique per route + role
routePermissionSchema.index({ routerEndpoint: 1, roleValue: 1 }, { unique: true });

export default mongoose.model("RoutePermission", routePermissionSchema);
