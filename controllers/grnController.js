import GRN from "../models/grnModel.js";
import PurchaseOrder from "../models/PurchaseOrder.js"
import InventoryStock from "../models/InventoryStock.js";
// ✅ Create GRN
// export const createGRN = async (req, res) => {
//     try {
//         const grn = new GRN(req.body);
//         await grn.save();

//         res.status(201).json({
//             success: true,
//             message: "GRN created successfully",
//             grn,
//         });
//     } catch (error) {
//         console.error("Create GRN Error:", error);
//         res.status(500).json({ success: false, message: "Failed to create GRN", error: error.message });
//     }
// };



// Create GRN
export const createGRN = async (req, res) => {
    try {
        const { grnNo, poID, grnDate, finyear, items, grandAmount, createdBy } = req.body;



        const po = await PurchaseOrder.findByIdAndUpdate(
            poID,
            { $set: { poStatus: 2 } }, // your value for "GRN created" (you used 2)

        );


        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "At least one item is required" });
        }



        const grn = new GRN({
            grnNo,
            poID,
            grnDate,
            finyear,
            items,
            grandAmount,
            createdBy,
        });

        await grn.save();


        res.status(201).json({
            success: true,
            message: "GRN created successfully",
            grn,
        });
    } catch (error) {
        console.error("Create GRN Error:", error);
        res.status(500).json({ success: false, message: "Failed to create GRN", error: error.message });
    }
};


// ✅ Get all GRNs
export const getAllGRNs = async (req, res) => {
    try {
        const grns = await GRN.find()
            .populate("poID", "orderNo vendorId")
            .populate("createdBy", "name email");

        res.status(200).json({ success: true, grns });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch GRNs", error: error.message });
    }
};

// ✅ Get single GRN
export const getSingleGRN = async (req, res) => {
    try {
        const { id } = req.params;
        const grn = await GRN.findById(id)
            .populate("poID", "orderNo vendorId")
            .populate("createdBy", "name email");

        if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

        res.status(200).json({ success: true, grn });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch GRN", error: error.message });
    }
};

// ✅ Approve GRN
export const approveGRN = async (req, res) => {
    try {
        const { id } = req.params;
        const grn = await GRN.findByIdAndUpdate(
            id,
            { grnStatus: "Approved" },
            { new: true }
        );

        if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

        res.status(200).json({ success: true, message: "GRN approved successfully", grn });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to approve GRN", error: error.message });
    }
};

// ✅ Delete GRN
export const deleteGRN = async (req, res) => {
    try {
        const { id } = req.params;
        const grn = await GRN.findByIdAndDelete(id);

        if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

        res.status(200).json({ success: true, message: "GRN deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete GRN", error: error.message });
    }
};





// Generate batch number like BATCH-001
const generateBatchNo = () => {
    const randomNum = Math.floor(100 + Math.random() * 900); // random 3 digit
    return `BATCH-${randomNum}`;
};

export const approveAndUpdateStock = async (req, res) => {
    try {
        const { grnId } = req.params;

        const grn = await GRN.findById(grnId);
        if (!grn) return res.status(404).json({ success: false, message: "GRN not found" });

        // Update status
        grn.grnStatus = "Approved";
        await grn.save();

        // Save each item into InventoryStock
        const stockEntries = grn.items.map((item) => ({
            grnId: grn._id,
            itemId: item.itemId,
            itemPOQty: item.itemQty,
            receivedQty: item.receivedQty,
            poRate: item.amount / item.itemQty, // assuming amount = poRate * qty
            saleRate: item.sellRate,
            batchNo: generateBatchNo(),
        }));

        await InventoryStock.insertMany(stockEntries);

        res.json({ success: true, message: "GRN approved & stock updated", stockEntries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getAllStocks = async (req, res) => {
    try {
        const stocks = await InventoryStock.find().populate("itemId")


        res.status(200).json({ success: true, stocks });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch GRNs", error: error.message });
    }
};

