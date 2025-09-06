import mongoose from "mongoose";
const stateSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,

        },
        country_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Country",
            required: true,


        },
    },
    { timestamps: true }
);

export default mongoose.model("State", stateSchema);

