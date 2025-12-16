import mongoose from "mongoose";

const PaymentMethodSchema = new mongoose.Schema({

    traineeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    workoutScheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    payment_provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentProvider"
    },

    payment_proof: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending"
    },

    paid_at: {
        type: Date
    }

}, { timestamps: true });

export default mongoose.model("PaymentMethodWorkoutPlans", PaymentMethodSchema);
