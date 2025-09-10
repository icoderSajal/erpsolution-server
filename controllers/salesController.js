import Sales from "../models/Sales.js";
import InventoryStock from "../models/InventoryStock.js";

// Create Sale
export const createSale = async (req, res) => {
    try {
        const { saleNo, reqDate, finYear, customerName, address, items, grandTotal, createdBy } = req.body;

        // Validate stock availability before saving sale
        for (let item of items) {
            const stock = await InventoryStock.findOne({ itemId: item.itemId });
            if (!stock) {
                return res.status(404).json({ success: false, message: `Stock not found for item ${item.itemName}` });
            }
            if (stock.receivedQty < item.itemQty) {
                return res.status(400).json({ success: false, message: `Not enough stock for item ${item.itemName}` });
            }
        }

        // Create Sale
        const newSale = await Sales.create({
            saleNo,
            reqDate,
            finYear,
            customerName,
            address,
            items,
            grandTotal,
            createdBy,
        });

        // Update stock quantities
        for (let item of items) {
            await InventoryStock.findOneAndUpdate(
                { itemId: item.itemId },
                { $inc: { receivedQty: -item.itemQty } }, // decrement stock
                { new: true }
            );
        }

        res.status(201).json({ success: true, message: "Sale created successfully", sale: newSale });
    } catch (error) {
        console.error("Error creating sale:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};



export const getAllSales = async (req, res) => {
    try {
        const sales = await Sales.find().populate("createdBy")


        res.status(200).json({ success: true, sales });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch GRNs", error: error.message });
    }
};

// Get single purchase order
export const getSalesOrderById = async (req, res) => {
    try {
        const order = await Sales.findById(req.params.id)

            .populate("items.itemId", "itemName");

        if (!order) return res.status(404).json({ success: false, message: "Purchase Order not found" });

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



