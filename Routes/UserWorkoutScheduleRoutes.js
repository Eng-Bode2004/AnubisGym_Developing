import express from "express";
import Controller from "../Controllers/UserWorkoutScheduleController.js";

const router = express.Router();

// Create schedule
router.post("/", Controller.create);

// Get schedules by trainee
router.get("/trainee/:traineeId", Controller.getByTrainee);

// Get schedules by coach
router.get("/coach/:coachId", Controller.getByCoach);

// Get by ID
router.get("/:id", Controller.getById);

// Update schedule
router.put("/:id", Controller.update);

// Cancel schedule
router.patch("/:id/cancel", Controller.cancel);

router.post("/attach-payment", Controller.attachPayment);


export default router;
