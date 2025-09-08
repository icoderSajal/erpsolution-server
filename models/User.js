import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE, ACTIVE } from "./enums.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"],
            index: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false, // include explicitly when needed: .select("+password")
        },
        isAdmin: {
            type: Number,
            enum: [0, 1],
            default: 0,
        },
        role: {
            type: Number,
            enum: Object.values(ROLE),
            default: ROLE.USER,
            index: true,
        },
        active: {
            type: Number,
            enum: Object.values(ACTIVE),
            default: ACTIVE.ACTIVE,
            index: true,
        },


    },
    { timestamps: true }
);

// Hash password if modified
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

// Hide internal fields on toJSON
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    },
});

export default mongoose.model("User", userSchema);
