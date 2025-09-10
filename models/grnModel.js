import mongoose from "mongoose";

const grnItemSchema = new mongoose.Schema({
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
    itemName: { type: String, required: true },
    itemQty: { type: Number, required: true },
    receivedQty: { type: Number, required: true },
    sellRate: { type: Number, required: true },
    amount: { type: Number, required: true },
});

const grnSchema = new mongoose.Schema(
    {
        grnNo: { type: String, required: true, unique: true },
        poID: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder", required: true },
        grnDate: { type: Date, required: true },
        finyear: { type: String, required: true },
        items: [grnItemSchema],
        grandAmount: { type: Number, required: true },
        grnStatus: {
            type: String,
            enum: ["Pending", "Approved"],
            default: "Pending",
        },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default mongoose.model("GRN", grnSchema);
