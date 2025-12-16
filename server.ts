import "dotenv/config";
import express from "express";
import "./Config/DataBase.js";
import UserWorkoutScheduleRoutes from "./Routes/UserWorkoutScheduleRoutes";
import cors from "cors";

// Initialize Express
const app = express();

// Middleware
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true
}));

// Routes
app.use("/api/v1/user-workout-schedule", UserWorkoutScheduleRoutes);

// Start Server
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});