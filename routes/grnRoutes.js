import express from "express";
import {
    createGRN,
    getAllGRNs,
    getSingleGRN,
    approveGRN,
    deleteGRN,
    approveAndUpdateStock,
    getAllStocks
} from "../controllers/grnController.js";
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

// ✅ Routes
router.post("/create", protect, createGRN);
router.get("/all-grns", protect, getAllGRNs);
router.get("/getgrn/:id", protect, getSingleGRN);
router.put("/approve/:id", protect, approveGRN);
router.delete("/:id", protect, deleteGRN);

//stock update
router.put("/approve-grn/:grnId", protect, approveAndUpdateStock);
router.get("/all-stocks", protect, getAllStocks)

export default router;
