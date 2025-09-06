import express from "express";
import {
    createRole,
    getRoles,
    createPermission,
    getPermissions,
    createRoutePermission,
    getRoutePermissions,
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deactiveCustomer,
    createModule,
    getAllAppModule,
    getAppModuleById,
    updateAppModule,
    deactiveAppModule,
    getRoleById,
    updateRole,
    deactiveRole,
    getPermissionById,
    updatePermission,
    deactivePermission,
    groupedModulePermissions,
} from "../controllers/adminController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

import {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompany,
    deactiveCompany,
} from "../controllers/companyController.js";
import { getPermissionByModuleId } from "../controllers/userPermissionController.js";

const router = express.Router();

/////////////////////////        Roles Routes      //////////////////////////
router.post("/roles", protect, adminOnly, createRole);
router.get("/roles", protect, adminOnly, getRoles);
router.get("/get-role/:id", protect, adminOnly, getRoleById);
router.put("/update-role/:id", protect, adminOnly, updateRole);
router.put("/delete-role/:id", protect, adminOnly, deactiveRole)

/////////////////////////        App Sub Modules Routes      //////////////////////////
router.post("/permissions", protect, adminOnly, createPermission);
router.get("/permissions", protect, adminOnly, getPermissions);
router.get("/get-permissions/:id", protect, adminOnly, getPermissionById);
router.put("/update-permissions/:id", protect, adminOnly, updatePermission);
router.put("/delete-permission/:id", protect, adminOnly, deactivePermission)

/////////////////////////        App Routes Modules Routes       //////////////////////////
// Route Permissions
router.post("/route-permissions", protect, adminOnly, createRoutePermission);
router.get("/route-permissions", protect, adminOnly, getRoutePermissions);


/////////////////////////        company master routes       //////////////////////////
router.post("/create-company", protect, adminOnly, createCompany);
router.get("/getcompanies", protect, adminOnly, getCompanies);
router.get("/getcompany/:id", protect, adminOnly, getCompanyById);
router.put("/edit-company/:id", protect, adminOnly, updateCompany);
router.put("/delete-company/:id", protect, adminOnly, deactiveCompany);


/////////////////////////        Custome Type Routes       //////////////////////////
router.post("/create-customer", protect, adminOnly, createCustomer);
router.get("/getcustomers", protect, adminOnly, getCustomers);
router.get("/getcustomer/:id", protect, adminOnly, getCustomerById);
router.put("/update-customer/:id", protect, adminOnly, updateCustomer);
router.put("/delete-customer/:id", protect, adminOnly, deactiveCustomer);

//appmodules
/////////////////////////        App Modules Routes      //////////////////////////
router.post("/create-appmodule", protect, adminOnly, createModule);
router.get("/getappmodules", protect, getAllAppModule);
router.get("/getappmodule/:id", protect, adminOnly, getAppModuleById);
router.put("/update-appmodule/:id", protect, adminOnly, updateAppModule);
router.put("/delete-appmodule/:id", protect, adminOnly, deactiveAppModule);

///////////////////////////        User Access      //////////////////////////

router.get("/userpermisson/:moduleId", protect, adminOnly, getPermissionByModuleId);
router.get("/getappdata", protect, adminOnly, groupedModulePermissions)




export default router;

