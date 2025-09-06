import Role from "../models/Role.js";
import Permission from "../models/Permission.js";
import RoutePermission from "../models/RoutePermission.js";
import Customer from "../models/Customer.js"
import AppModule from "../models/AppModule.js"



/////////////////////////       Roles       //////////////////////////
// Role CRUD
export const createRole = async (req, res) => {
    try {
        const { roleName, roleValue } = req.body;
        const exists = await Role.findOne({ roleName });
        if (exists) return res.status(400).json({ msg: "roleName Name already registered" });

        const role = await Role.create({ roleName, roleValue });
        res.status(201).json({ success: true, role });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json({ success: true, roles });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


export const getRoleById = async (req, res) => {

    const { id } = req.params;
    try {
        let role;
        role = await Role.findById({ _id: id });

        return res.status(200).json({ success: true, role });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const updateRole = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!role) return res.status(404).json({ message: " role not found" });
        return res.status(200).json({ success: true, role });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const deactiveRole = async (req, res) => {

    try {
        const { id } = req.params;

        const customer = await Role.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ success: false, error: "Customer not found" });
        }

        res.json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};



/////////////////////////        App Sub Modules Permissions    //////////////////////////
// Permission CRUD
export const createPermission = async (req, res) => {
    try {
        // db.permissions.find({$and:[{defaultPermission:1},{active:1}]})
        const { moduleId, permissionName, defaultPermission } = req.body;
        const perm = await Permission.create({ moduleId, permissionName, defaultPermission });
        res.status(201).json({ success: true, perm });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getPermissions = async (req, res) => {
    try {


        const perms = await Permission.find({ $and: [{ defaultPermission: 1 }, { active: 1 }] }).populate("moduleId");
        res.json({ success: true, perms });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};



export const getPermissionById = async (req, res) => {

    const { id } = req.params;
    try {
        let permission;
        permission = await Permission.findById({ _id: id });

        return res.status(200).json({ success: true, permission });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const updatePermission = async (req, res) => {
    try {
        const permission = await Permission.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!permission) return res.status(404).json({ message: "permission not found" });
        return res.status(200).json({ success: true, permission });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


export const deactivePermission = async (req, res) => {

    try {
        const { id } = req.params;

        const permission = await Permission.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!permission) {
            return res.status(404).json({ success: false, error: "permission not found" });
        }

        res.json({ success: true, permission });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};



/////////////////////////        Routes       //////////////////////////

// Route Permission CRUD
export const createRoutePermission = async (req, res) => {
    try {
        const { moduleId, routerEndpoint, roleValue, permissionId, permissionValues } = req.body;
        const routePerm = await RoutePermission.create({
            moduleId,
            routerEndpoint,
            roleValue,
            permissionId,
            permissionValues,
        });
        res.status(201).json({ success: true, routePerm });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const getRoutePermissions = async (req, res) => {
    try {
        // db.permissions.find({$and:[{defaultPermission:1},{active:1}]})
        const routes = await RoutePermission.find().populate("permissionId").populate("moduleId");
        res.json({ success: true, routes });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


/////////////////////////       Customer Type       //////////////////////////

// Create customer
export const createCustomer = async (req, res) => {


    try {
        const { customerName, customerDescription, active } = req.body;
        const exists = await Customer.findOne({ customerName });
        if (exists) return res.status(400).json({ msg: "Customer Name already registered" });
        const customer = await Customer.create({ customerName, customerDescription, active });
        res.status(201).json({
            success: true,
            msg: "Customer created successfully",
            customer,
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


// Get all customer
export const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({ active: 1 });
        return res.status(200).json({
            success: true,
            msg: "customers Data",
            customers: customers,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single customer
export const getCustomerById = async (req, res) => {

    const { id } = req.params;
    try {
        let customer;
        customer = await Customer.findById({ _id: id });

        return res.status(200).json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update customer
export const updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!customer) return res.status(404).json({ message: "Company not found" });
        return res.status(200).json({ success: true, customer });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete customer soft delet
export const deactiveCustomer = async (req, res) => {

    try {
        const { id } = req.params;

        const customer = await Customer.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!customer) {
            return res.status(404).json({ success: false, error: "Customer not found" });
        }

        res.json({ success: true, customer });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};


/////////////////////////        App Modules       //////////////////////////

// Create modules
export const createModule = async (req, res) => {


    try {
        const { moduleName, modulePath, active } = req.body;
        const exists = await AppModule.findOne({ moduleName });
        if (exists) return res.status(400).json({ msg: "Module Name already created" });
        const module = await AppModule.create({ moduleName, modulePath, active });
        res.status(201).json({
            success: true,
            msg: "AppModule created successfully",
            module,
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


// Get all modules
export const getAllAppModule = async (req, res) => {
    try {
        const appModules = await AppModule.find({ active: 1 });
        return res.status(200).json({
            success: true,
            msg: "AppModule Data",
            appModules,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get single modules
export const getAppModuleById = async (req, res) => {

    const { id } = req.params;
    try {
        let appModule;
        appModule = await AppModule.findById({ _id: id });

        return res.status(200).json({ success: true, appModule });
    } catch (error) {
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

// Update modules
export const updateAppModule = async (req, res) => {
    try {
        const appModule = await AppModule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!appModule) return res.status(404).json({ message: "Modules not found" });
        return res.status(200).json({ success: true, appModule });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete modules soft delet
export const deactiveAppModule = async (req, res) => {

    try {
        const { id } = req.params;

        const appModule = await AppModule.findByIdAndUpdate(
            id,
            { active: 0 },
            { new: true }
        );

        if (!appModule) {
            return res.status(404).json({ success: false, error: "Modules not found" });
        }

        res.json({ success: true, appModule });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
};


export const groupedModulePermissions = async (req, res) => {
    try {
        const appData = await RoutePermission.aggregate([

            {
                $lookup: {
                    from: "permissions",
                    localField: "permissionId",
                    foreignField: "_id",
                    as: "permission"
                }
            },
            { $unwind: "$permission" },


            {
                $lookup: {
                    from: "appmodules",
                    localField: "moduleId",
                    foreignField: "_id",
                    as: "module"
                }
            },
            { $unwind: "$module" },

            {
                $group: {
                    _id: "$module._id",
                    moduleName: { $first: "$module.moduleName" },
                    modulePath: { $first: "$module.modulePath" },
                    permissions: {
                        $push: {
                            permissionName: "$permission.permissionName",
                            routerEndpoint: "$routerEndpoint"
                        }
                    }
                }
            },


            { $sort: { moduleName: 1 } }
        ]);
        return res.status(200).json({
            success: true,
            msg: "AppModule Data",
            appData,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

// const groupedModulePermissions = await RoutePermission.aggregate([
//   // Lookup Permission data
//   {
//     $lookup: {
//       from: "permissions", // collection name in MongoDB (should match the actual name)
//       localField: "permissionId",
//       foreignField: "_id",
//       as: "permission"
//     }
//   },
//   { $unwind: "$permission" },

//   // Lookup Module data
//   {
//     $lookup: {
//       from: "appmodules", // collection name
//       localField: "moduleId",
//       foreignField: "_id",
//       as: "module"
//     }
//   },
//   { $unwind: "$module" },

//   // Group by module
//   {
//     $group: {
//       _id: "$module._id",
//       moduleName: { $first: "$module.moduleName" },
//       modulePath: { $first: "$module.modulePath" },
//       permissions: {
//         $push: {
//           permissionName: "$permission.permissionName",
//           routerEndpoint: "$routerEndpoint"
//         }
//       }
//     }
//   },

//   // Optional: Sort by moduleName
//   { $sort: { moduleName: 1 } }
// ]);








