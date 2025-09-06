import UserPermission from "../models/UserPermission.js";
import UserRoutePermission from "../models/UserRoutePermission.js";
import Permission from "../models/Permission.js"
// Assign user permissions
export const setUserPermissions = async (req, res) => {
    try {
        const { userId, permissions } = req.body;
        const up = await UserPermission.findOneAndUpdate(
            { userId },
            { permissions },
            { upsert: true, new: true }
        );
        return res.json({ success: true, up });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const getUserPermissions = async (req, res) => {
    try {
        const { userId } = req.params;
        const up = await UserPermission.findOne({ userId });
        return res.json({ success: true, up });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

// Assign user route permissions
export const setUserRoutePermissions = async (req, res) => {
    try {
        const { userId, routes } = req.body;
        const urp = await UserRoutePermission.findOneAndUpdate(
            { userId },
            { routes },
            { upsert: true, new: true }
        );
        return res.json({ success: true, urp });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const getUserRoutePermissions = async (req, res) => {
    try {
        const { userId } = req.params;
        const urp = await UserRoutePermission.findOne({ userId });
        return res.json({ success: true, urp });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export const getPermissionByModuleId = async (req, res) => {
    try {
        const userParms = await Permission.find({ moduleId: req.params.moduleId });
        return res.json({ success: true, userParms });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching permissions" });
    }
} 
