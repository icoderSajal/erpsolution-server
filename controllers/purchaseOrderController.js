

import PurchaseOrder from "../models/PurchaseOrder.js";




// // Create Purchase Order
export const createPurchaseOrder = async (req, res) => {
    try {
        const {
            orderNo,
            vendorId,
            poDate,
            finYear,
            address,
            country,
            state,
            city,
            pin,
            items,
            poStatus
        } = req.body;

        // ✅ Validation
        if (
            !orderNo ||
            !vendorId ||
            !poDate ||
            !finYear ||
            !address ||
            !country ||
            !state ||
            !city ||
            !pin ||
            !items ||
            items.length === 0
        ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // ✅ Duplicate Check
        const existingOrder = await PurchaseOrder.findOne({ orderNo });
        if (existingOrder) {
            return res.status(400).json({ success: false, message: "Order No already exists" });
        }

        // ✅ Grand Total
        const grandTotal = items.reduce((sum, item) => sum + item.itemAmt, 0);

        const newOrder = new PurchaseOrder({
            orderNo,
            vendorId,
            poDate,
            finYear,
            address,
            country,
            state,
            city,
            pin,
            items,
            grandTotal,
            createdBy: req.user?._id || null, // optional if JWT middleware
            poStatus: 0
        });

        await newOrder.save();
        res.status(201).json({ success: true, message: "Purchase Order created successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all purchase orders
// export const getAllPurchaseOrders = async (req, res) => {
//     try {
//         //db.purchaseorders.find({poStatus:{$not:{$regex:'2'}}})
//         const orders = await PurchaseOrder.find()
//             .populate("vendorId", "vendorName")
//             .populate("country", "name")
//             .populate("state", "name")
//             .populate("city", "name")
//             .populate("items.itemId", "itemName");
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
export const getAllPurchaseOrders = async (req, res) => {
    try {
        // Fetch only purchase orders where poStatus is 0 or 1
        const orders = await PurchaseOrder.find({
            poStatus: { $in: [0, 1] }
        })
            .populate("vendorId", "vendorName")
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .populate("items.itemId", "itemName");

        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get single purchase order
export const getPurchaseOrderById = async (req, res) => {
    try {
        const order = await PurchaseOrder.findById(req.params.id)
            .populate("vendorId", "vendorName")
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .populate("items.itemId", "itemName");

        if (!order) return res.status(404).json({ success: false, message: "Purchase Order not found" });

        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete purchase order
export const deletePurchaseOrder = async (req, res) => {
    // try {
    //     const deleted = await PurchaseOrder.findByIdAndDelete(req.params.id);
    //     if (!deleted) return res.status(404).json({ success: false, message: "Purchase Order not found" });

    //     res.json({ success: true, message: "Purchase Order deleted successfully" });
    // } catch (error) {
    //     res.status(500).json({ success: false, message: error.message });
    // }
    try {
        const { id } = req.params;

        const postatus = await PurchaseOrder.findByIdAndUpdate(
            id,
            { poStatus: 2 },
            { new: true }
        );

        if (!postatus) {
            return res.status(404).json({ success: false, error: "PO not found" });
        }

        res.json({ success: true, postatus });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};

export const updateStatus = async (req, res) => {

    try {
        const { id } = req.params;

        const status = await PurchaseOrder.findByIdAndUpdate(
            id,
            { poStatus: 1 },
            { new: true }
        );

        if (!status) {
            return res.status(404).json({ success: false, error: "item not found" });
        }

        res.json({ success: true, status });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};


// Get all purchase orders
export const getApprovedPurchase = async (req, res) => {
    try {

        const orders = await PurchaseOrder.find({ poStatus: 1 })
            .populate("vendorId", "vendorName")
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .populate("items.itemId", "itemName");
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};



// ✅ Update Purchase Order
export const updatePurchaseOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            orderNo,
            vendorId,
            poDate,
            finYear,
            address,
            country,
            state,
            city,
            pin,
            items,
            grandTotal,
            createdBy,
        } = req.body;

        const updatedPO = await PurchaseOrder.findByIdAndUpdate(
            id,
            {
                orderNo,
                vendorId,
                poDate,
                finYear,
                address,
                country,
                state,
                city,
                pin,
                items,
                grandTotal,
                createdBy,
            },
            { new: true } // return updated document
        )
            .populate("vendorId", "vendorName")
            .populate("country", "name")
            .populate("state", "name")
            .populate("city", "name")
            .populate("items.itemId", "itemName");

        if (!updatedPO) {
            return res.status(404).json({ success: false, message: "Purchase Order not found" });
        }

        res.status(200).json({
            success: true,
            message: "Purchase Order updated successfully",
            order: updatedPO,
        });
    } catch (error) {
        console.error("Update Purchase Order Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update purchase order",
            error: error.message,
        });
    }
};




