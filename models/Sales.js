import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
    {
        saleNo: { type: String, required: true, unique: true },
        reqDate: { type: Date, required: true },
        finYear: { type: String, required: true },
        customerName: { type: String, required: true },
        address: { type: String, required: true },
        items: [
            {
                itemId: { type: mongoose.Schema.Types.ObjectId, ref: "ItemMaster", required: true },
                itemName: { type: String },
                itemQty: { type: Number, required: true },
                itemRate: { type: Number, required: true },
                itemAmt: { type: Number, required: true },
            },
        ],
        grandTotal: { type: Number, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("Sales", salesSchema);
