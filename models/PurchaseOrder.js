import mongoose from "mongoose";

const purchaseOrderItemSchema = new mongoose.Schema(
    {
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ItemMaster", // reference to your Item Master
            required: true,
        },
        itemName: { type: String, required: true },
        itemQty: { type: Number, required: true },
        itemRate: { type: Number, required: true },
        itemAmt: { type: Number, required: true },
    },
    { _id: false }
);

const purchaseOrderSchema = new mongoose.Schema(
    {
        orderNo: { type: String, required: true, unique: true },
        vendorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vendor", // link to Vendor collection
            required: true,
        },
        poDate: { type: Date, required: true },
        finYear: { type: String, required: true },

        // Address fields
        address: { type: String, required: true },
        country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
            required: true,
        },
        state: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "State",
            required: true,
        },
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            required: true,
        },
        pin: { type: String, required: true },

        // Items in this order
        items: {
            type: [purchaseOrderItemSchema],
            validate: [(val) => val.length > 0, "At least one item is required"],
        },

        // Totals
        grandTotal: { type: Number, required: true },

        // Audit fields
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        poStatus: {
            type: Number,// 0==>Pending, 1 ==>Approved , 2==>Rejected
            default: 0

        }
    },
    { timestamps: true }
);

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;


