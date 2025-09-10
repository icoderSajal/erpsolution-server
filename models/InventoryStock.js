import mongoose from "mongoose";

const inventoryStockSchema = new mongoose.Schema(
    {
        
        
        grnId: { type: mongoose.Schema.Types.ObjectId, ref: "GRN", required: true },
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "ItemMaster", required: true },
        itemPOQty: { type: Number, required: true },
        receivedQty: { type: Number, required: true },
        poRate: { type: Number, required: true },
        saleRate: { type: Number, required: true },
        batchNo: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model("InventoryStock", inventoryStockSchema);
