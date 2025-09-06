import mongoose from "mongoose";
const countrySchema = new mongoose.Schema(
    {
        sortname: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);
export default mongoose.model("Country", countrySchema);


