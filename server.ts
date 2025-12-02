import "dotenv/config";
import express from "express";
import "./Config/DataBase.js";
import SubscriptionPlan_Routes from "./Routes/SubscriptionPlan_Routes.ts";
import cors from "cors";

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Routes
app.use("/api/v1/subscription-plans", SubscriptionPlan_Routes);

// Start Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});