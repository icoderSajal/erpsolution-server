
import Unit from "../models/Unit.js"

// Create Units
export const createUnit = async (req, res) => {


    try {
        const { unitName, unitValue, active } = req.body;
        const unit = await Unit.create({ unitName, unitValue, active });
        res.status(201).json({ success: true, unit });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


// Get all Units
export const getUnits = async (req, res) => {
    try {
        const units = await Unit.find({ active: 1 });


        return res.status(200).json({
            success: true,
            msg: "Unit Data",
            units: units,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single Units
export const getUnitById = async (req, res) => {

    const { id } = req.params;
    try {
        let unit;
        unit = await Unit.findById({ _id: id });

        return res.status(200).json({ success: true, unit });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update Units
export const updateUnit = async (req, res) => {
    try {
        const unit = await Unit.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!unit) return res.status(404).json({ message: "Unit not found" });
        return res.status(200).json({ success: true, unit });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Units soft delet
export const deactiveUnit = async (req, res) => {

    try {
        const { id } = req.params;

        const unit = await Unit.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!unit) {
            return res.status(404).json({ success: false, error: "Company not found" });
        }

        res.json({ success: true, unit });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};



