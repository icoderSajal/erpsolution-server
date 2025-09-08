
import Vendor from "../models/Vendor.js"

// Create company
export const createVendor = async (req, res) => {

    try {
        const vendor = new Vendor(req.body);
        await vendor.save();
        return res.status(200).json({ success: true, vendor });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }




};


// Get all companies
export const getVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find({ active: 1 }).populate("state").populate("city");


        return res.status(200).json({
            success: true,
            msg: "vendors Data",
            vendors: vendors,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single company
export const getVendorById = async (req, res) => {

    const { id } = req.params;
    try {
        let vendor;
        vendor = await Vendor.findById({ _id: id });

        return res.status(200).json({ success: true, vendor });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update company
export const updateVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!vendor) return res.status(404).json({ message: "Vendor not found" });
        return res.status(200).json({ success: true, vendor });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete company soft delet
export const deactiveVendor = async (req, res) => {

    try {
        const { id } = req.params;

        const vendor = await Vendor.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!vendor) {
            return res.status(404).json({ success: false, error: "Vendor not found" });
        }

        res.json({ success: true, vendor });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};




