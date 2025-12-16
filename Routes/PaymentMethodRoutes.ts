import express from "express";
const router = express.Router();
import PaymentController from "../Controllers/PaymentController";

// Create a payment
router.post('/', PaymentController.create);

// Complete a payment
router.post('/:paymentId/complete', PaymentController.complete);

// Optional: list all payments
router.get('/', PaymentController.getAll);

// In paymentRoutes.js
router.get('/pending', PaymentController.getPending);


export default router;