import express from "express";
import {
    setUserPermissions,
    getUserPermissions,
    setUserRoutePermissions,
    getUserRoutePermissions,
} from "../controllers/userPermissionController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import { getRoutePermissions } from "../controllers/adminController.js";

const router = express.Router();


router.get("/route-permissions", protect, getRoutePermissions);

// User permissions
// router.post("/user-permissions", protect, adminOnly, setUserPermissions);
// router.get("/permissions/:userId", protect, getUserPermissions);

// // User route permissions
// router.post("/user-route-permissions", protect, adminOnly, setUserRoutePermissions);
// router.get("/route-permissions/:userId", protect, getUserRoutePermissions);

export default router;

// create permission
// {
//   "userId": "68ad582e467939523b3f25e2",
//   "permissions": [
//     {
//       "permissionName": "Create User",
//       "permissionValues": [ 1, 2,3]
//     },
//     {
//       "permissionName": "Delete User",
//       "permissionValues": [1, 2, 3]
//     }
//   ]
// }

// user router PermissionStatus
// {
//   "userId": "64f7d1f12a3b5a12d8c12345",
//   "routes": [
//     {
//       "routerEndpoint": "/user/attendance",
//       "permissionValues": [1, 2]
//     },
//     {
//       "routerEndpoint": "/user/profile",
//       "permissionValues": [0, 1, 2, 3]
//     }
//   ]
// }


