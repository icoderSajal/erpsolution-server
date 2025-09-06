import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
        if (!token) return res.status(401).json({ msg: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ msg: "User not found" });

        next();
    } catch (err) {
        res.status(401).json({ msg: "Unauthorized", error: err.message });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin === 1) {
        return next();
    }
    return res.status(403).json({ msg: "Admin access only" });
};
