import express from "express";
import { createSale, getAllSales, getSalesOrderById } from "../controllers/salesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-sale", protect, createSale);
router.get("/get-allsales", protect, getAllSales)
router.get("/get-single/:id", protect, getSalesOrderById)

export default router;
