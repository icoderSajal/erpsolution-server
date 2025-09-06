import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hrRoutes from "./routes/hrRoutes.js";
import locationRoutes from "./routes/locationRoutes.js"
import inventoryRoutes from "./routes/inventoryRoutes.js"
import cors from "cors";
import path from "path";




// Load env vars
dotenv.config();

// Connect DB
//connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

app.use("/images", express.static(path.join(process.cwd(), "public/images")));


//app.use(express.static("public/uploadsitem"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hradmin", hrRoutes);
app.use("/api/local", locationRoutes);

app.use("/api/inventory", inventoryRoutes)

// Health check
app.get("/", (req, res) => {

    res.send("API is running... on ", connectDB());
});

// Error handling
app.use((req, res) => {
    res.status(404).json({ msg: "Route not found" });
});

const PORT = process.env.PORT || 9000;




//server listen or running
app.listen(process.env.PORT, () => {
    connectDB()
    console.log(` server runnning on Port ${PORT}`);
});

