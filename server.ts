import "dotenv/config";
import express from "express";
import "./Config/DataBase.js";
import Strenght_Tracking_Routes from "./Routes/Strenght_Tracking_Routes.ts";
// Initialize Express
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/strength-tracking", Strenght_Tracking_Routes);

// Start Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});