import "dotenv/config";
import express from "express";
import cors from "cors";
import "./Config/DataBase.js"; // Mongo connection
import UserMembershipRoutes from "./Routes/UserMembershipRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
}));

// Routes
app.use("/api/v1/user-membership", UserMembershipRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
