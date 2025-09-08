import express from "express";
import {
    createPurchaseOrder,
    getAllPurchaseOrders,
    getPurchaseOrderById,
    deletePurchaseOrder,
    updateStatus,
    getApprovedPurchase,
    updatePurchaseOrder
} from "../controllers/purchaseOrderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST - Create Purchase Order
router.post("/create-po", protect, createPurchaseOrder);

// GET - All Purchase Orders
router.get("/getallpurchase", protect, getAllPurchaseOrders);

// GET - Single Purchase Order
router.get("/getsingleepurchase/:id", protect, getPurchaseOrderById);

// DELETE - Purchase Order
router.put("/delete-po/:id", protect, deletePurchaseOrder);

//Update Status
router.put("/update-status/:id", protect, updateStatus)
//Get Approved PO
router.get("/getapprovedpurchase", protect, getApprovedPurchase);

router.put("/update-po/:id", protect, updatePurchaseOrder);
export default router;
