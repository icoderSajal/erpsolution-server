import ItemMaster from "../models/ItemMaster.js";
import multer from "multer";
import path from "path";
import SubCategory from "../models/SubCategory.js";


export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads/employeeImg");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
export const upload = multer({ storage: storage });

// Create Units
export const createItem = async (req, res) => {


    try {
        const item = new ItemMaster(req.body);
        await item.save();
        return res.status(200).json({ success: true, item, itemImage: req.file ? req.file.filename : "" });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


// // Get all Units
export const getAllItems = async (req, res) => {
    try {
        const items = await ItemMaster.find({ active: 1 }).populate("categoryId").populate("subcategoryId").populate("unitId");


        return res.status(200).json({
            success: true,
            msg: "Item Data",
            items: items,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// // Get single Units
export const getItemById = async (req, res) => {

    const { id } = req.params;
    try {
        let item;
        item = await ItemMaster.findById({ _id: id });

        return res.status(200).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// // Update Units
export const updateItem = async (req, res) => {
    try {
        const item = await ItemMaster.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!item) return res.status(404).json({ message: "item not found" });
        return res.status(200).json({ success: true, item });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// // Delete Units soft delet
export const deactiveItem = async (req, res) => {

    try {
        const { id } = req.params;

        const item = await ItemMaster.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ success: false, error: "item not found" });
        }

        res.json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};



export const getSubcateByCategorID = async (req, res) => {
    try {
        const subcategories = await SubCategory.find({ categoryId: req.params.categoryId });
        res.json({ success: true, subcategories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching states" });
    }


};


