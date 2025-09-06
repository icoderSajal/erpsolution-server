
import Category from "../models/Category.js"
import SubCategory from "../models/SubCategory.js";

// Create Units
export const createCategory = async (req, res) => {


    try {
        const { catgoryCode, catgoryName, active } = req.body;
        const category = await Category.create({ catgoryCode, catgoryName, active });
        res.status(201).json({ success: true, category });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


// Get all Units
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ active: 1 });


        return res.status(200).json({
            success: true,
            msg: "Unit Data",
            categories: categories,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single Units
export const getCategoryById = async (req, res) => {

    const { id } = req.params;
    try {
        let category;
        category = await Category.findById({ _id: id });

        return res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update Units
export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!category) return res.status(404).json({ message: "category not found" });
        return res.status(200).json({ success: true, category });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Units soft delet
export const deactiveCategory = async (req, res) => {

    try {
        const { id } = req.params;

        const category = await Category.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ success: false, error: "category not found" });
        }

        res.json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};


////////////////////////Sub Categories

// Create Units
export const createSubCategory = async (req, res) => {


    try {
        const { categoryId, subcatgoryCode, subcatgoryName, active } = req.body;
        const subcategory = await SubCategory.create({ categoryId, subcatgoryCode, subcatgoryName, active });
        res.status(201).json({ success: true, subcategory });
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


// Get all Units
export const getSubCategories = async (req, res) => {
    try {
        const subcategories = await SubCategory.find({ active: 1 }).populate("categoryId");


        return res.status(200).json({
            success: true,
            msg: "Unit Data",
            subcategories: subcategories,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single Units
export const getSubCategoryById = async (req, res) => {

    const { id } = req.params;
    try {
        let subcategory;
        subcategory = await SubCategory.findById({ _id: id });

        return res.status(200).json({ success: true, subcategory });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update Units
export const updateSubCategory = async (req, res) => {
    try {
        const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!subcategory) return res.status(404).json({ message: "category not found" });
        return res.status(200).json({ success: true, subcategory });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete Units soft delet
export const deactiveSubCategory = async (req, res) => {

    try {
        const { id } = req.params;

        const subcategory = await SubCategory.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!subcategory) {
            return res.status(404).json({ success: false, error: "category not found" });
        }

        res.json({ success: true, subcategory });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};







