import Role from "../models/Role.js";

import Department from "../models/Department.js";

// Role CRUD
export const createDepartment = async (req, res) => {
    try {
        const { deparmentName, departmentActive } = req.body;
        const deparment = await Department.create({ deparmentName, departmentActive });
        res.status(201).json({ success: true, deparment });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json({ success: true, departments });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



export const getSignalDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const departments = await Department.findByIdAndDelete(id);
        res.json({ success: true, departments });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }


};



export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const departments = await Department.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ success: true, departments });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

};


export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const departments = await Department.findByIdAndDelete(id);
        res.json({ success: true, departments });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }

};



export const getUserRoles = async (req, res) => {
    try {
        // db.roles.
        const roles = await Role.find({ roleValue: { $ne: 1 } })
        res.json({ success: true, roles });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
