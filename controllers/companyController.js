// controllers/companyController.js
import Company from "../models/Company.js"

// Create company
export const createCompany = async (req, res) => {


    try {
        const company = new Company(req.body);
        await company.save();
        return res.status(200).json({ success: true, company });

    } catch (error) {
        return res.status(400).json({ success: false, message: error.message });
    }
};


// Get all companies
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ active: 1 }).populate("state").populate("city");


        return res.status(200).json({
            success: true,
            msg: "Companies Data",
            companies: companies,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single company
export const getCompanyById = async (req, res) => {

    const { id } = req.params;
    try {
        let company;
        company = await Company.findById({ _id: id });

        return res.status(200).json({ success: true, company });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update company
export const updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!company) return res.status(404).json({ message: "Company not found" });
        return res.status(200).json({ success: true, company });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete company soft delet
export const deactiveCompany = async (req, res) => {

    try {
        const { id } = req.params;

        const company = await Company.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!company) {
            return res.status(404).json({ success: false, error: "Company not found" });
        }

        res.json({ success: true, company });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};






// Soft delete company (set active = 0)
// router.put("/delete-company/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const company = await Company.findByIdAndUpdate(
//       id,
//       { active: 0 },
//       { new: true }
//     );

//     if (!company) {
//       return res.status(404).json({ success: false, error: "Company not found" });
//     }

//     res.json({ success: true, company });
//   } catch (error) {
//     res.status(500).json({ success: false, error: "Server error" });
//   }
// });


