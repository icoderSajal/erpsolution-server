import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createCategory, getCategoryById, getCategories, deactiveCategory, updateCategory, createSubCategory, getSubCategories, getSubCategoryById, updateSubCategory, deactiveSubCategory } from "../controllers/inventoryController.js"
import { createUnit, getUnits, getUnitById, updateUnit, deactiveUnit } from "../controllers/unitController.js"
import { createItem, deactiveItem, getAllItems, getItemById, updateItem, getSubcateByCategorID } from "../controllers/itemMasterController.js"
import { upload } from "../controllers/itemMasterController.js";
const router = express.Router();

//Unit
router.post("/create-unit", protect, createUnit);
router.get("/get-allunits", protect, getUnits);
router.get("/get-singleunit/:id", protect, getUnitById);
router.put("/update-unit/:id", protect, updateUnit);
router.put("/delete-unit/:id", protect, deactiveUnit);


// Category
router.post("/create-category", protect, createCategory);
router.get("/get-allcategories", protect, getCategories);
router.get("/get-singlecategory/:id", protect, getCategoryById);
router.put("/update-category/:id", protect, updateCategory);
router.put("/delete-category/:id", protect, deactiveCategory);

//Sub categories 

// Category
router.post("/create-subcategory", protect, createSubCategory);
router.get("/get-allsubcategories", protect, getSubCategories);
router.get("/get-singlesubcategory/:id", protect, getSubCategoryById);
router.put("/update-subcategory/:id", protect, updateSubCategory);
router.put("/delete-subcategory/:id", protect, deactiveSubCategory);

// Item Master
router.post("/create-item", protect, upload.single("image"), createItem);
router.get("/get-allitems", protect, getAllItems);
router.get("/get-singleitem/:id", protect, getItemById);
router.put("/update-item/:id", protect, updateItem);
router.put("/delete-item/:id", protect, deactiveItem);
router.get("/subcategory/:categoryId", protect, getSubcateByCategorID);



export default router;
