
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
    {
        companyName: { type: String, required: true },
        contactPerson: { type: String, required: true },
        designation: { type: String, required: true },
        deskNumber: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        email: { type: String, required: true },
        address1: { type: String, required: true },
        address2: { type: String, required: true },
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
        gstNumber: { type: String, required: true },
        companyEmail: { type: String, required: true },
        active: {
            type: Number,
            default: 1
        },
    },
    { timestamps: true }
);

export default mongoose.model("Company", companySchema);
