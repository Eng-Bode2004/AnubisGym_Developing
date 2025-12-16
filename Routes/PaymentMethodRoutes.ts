import express from "express";
import PaymentController from "../Controllers/PaymentController.js";

const router = express.Router();

router.post("/", PaymentController.create);
router.post("/:paymentId/complete", PaymentController.complete);

router.get("/", PaymentController.getAll);
router.get("/pending/trainer/:trainerId", PaymentController.getPendingByTrainer);

export default router;
