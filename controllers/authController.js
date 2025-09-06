import User from "../models/User.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });


};

// Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ msg: "Email already registered" });

        const user = await User.create({ name, email, password });
        // console.log(user)

        res.status(201).json({
            success: true,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return res.status(400).json({ msg: "Invalid credentials" });
        //console.log(user)
        const isMatch = await user.comparePassword(password);

        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        //console.log(isMatch, "---", user.password)
        console.log("tilllu", isMatch)

        res.json({
            success: true,
            user,
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


export const verifyUser = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};

export const getProfile = async (req, res) => {
    //console.log(req.user._id)
    try {
        const user_id = req.user._id;
        //const userData = await User.findOne({ _id: user_id});
        const user = await User.findOne({ _id: new mongoose.Types.ObjectId(user_id) }).select("-password");
        //const token = await generateAccessToken({ token: token });
        return res.status(200).json({
            success: true,
            msg: "Profile Data",
            //token,
            user: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message,
            error
        });
    }
};

