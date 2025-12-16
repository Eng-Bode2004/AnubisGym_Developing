import axios from "axios";
import PaymentMethodModel from "../Model/PaymentMethodModel.js";

const TRAINER_API =
    "https://trainer-profile.onrender.com/api/v1/trainer-profile/";

const WORKOUT_API =
    "https://user-workout-schedule.onrender.com/api/v1/user-workout-schedule/";

class PaymentService {

    async createPayment({ traineeId, workoutScheduleId, payment_provider, payment_proof }) {

        if (!traineeId || !workoutScheduleId || !payment_provider || !payment_proof) {
            const error = new Error("Missing required fields");
            error.statusCode = 400;
            throw error;
        }

        // 1️⃣ Get workout schedule
        const workoutRes = await axios.get(`${WORKOUT_API}${workoutScheduleId}`);
        const workout = workoutRes.data?.data;

        if (!workout) {
            const error = new Error("Workout schedule not found");
            error.statusCode = 404;
            throw error;
        }

        // 2️⃣ Get trainer profile
        const trainerRes = await axios.get(`${TRAINER_API}${workout.coach}`);
        const trainer = trainerRes.data?.data;

        if (!trainer) {
            const error = new Error("Trainer profile not found");
            error.statusCode = 404;
            throw error;
        }

        // 3️⃣ Calculate amount
        const amount = trainer.session_price * workout.total_sessions;

        // 4️⃣ Create payment
        const payment = await PaymentMethodModel.create({
            traineeId,
            trainerId: workout.coach,
            workoutScheduleId,
            amount,
            payment_provider,
            payment_proof,
            status: "pending"
        });

        return payment;
    }

    async completePayment(paymentId) {
        const payment = await PaymentMethodModel.findById(paymentId);
        if (!payment) throw new Error("Payment not found");

        payment.status = "completed";
        payment.paid_at = new Date();
        await payment.save();

        return payment;
    }

    async getAllPayments() {
        return PaymentMethodModel.find().sort({ createdAt: -1 });
    }

    async getPendingByTrainer(trainerId) {
        return PaymentMethodModel.find({
            trainerId,
            status: "pending"
        }).sort({ createdAt: -1 });
    }
}

export default new PaymentService();
