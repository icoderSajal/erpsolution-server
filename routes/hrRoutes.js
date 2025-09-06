import express from "express";
import {
    createDepartment,
    getSignalDepartment,
    getAllDepartments,
    deleteDepartment,
    updateDepartment,
    getUserRoles,

} from "../controllers/hrController.js";
import { addemployee, getAllEmployees, getEmployeeById, updateEmployee } from "../controllers/employeeController.js"
import { protect } from "../middlewares/authMiddleware.js";
import { getRoutePermissions } from "../controllers/adminController.js";




const router = express.Router();

/////////////////////////        App Modules       //////////////////////////
router.post("/create-department", protect, createDepartment);
router.get("/get-alldepartments", protect, getAllDepartments);
router.get("/get-singledepartment/:id", protect, getSignalDepartment);
router.put("/update-department/:id", protect, updateDepartment);
router.delete("/delete-department/:id", protect, deleteDepartment);

/////////////////////////       Common Routes gets Methos Like USER      //////////////////////////
router.get("/get-roles", protect, getUserRoles)
router.post("/create-user", protect, addemployee)




router.post("/add-employee", protect, addemployee);
router.get("/get-alluser", protect, getAllEmployees)
router.get("/get-userById/:id", protect, getEmployeeById)
router.put("/update-user/:id", protect, updateEmployee)

router.put("/delete-user/:id", protect, updateEmployee)

router.get("/route-permissions", protect, getRoutePermissions);


export default router;
