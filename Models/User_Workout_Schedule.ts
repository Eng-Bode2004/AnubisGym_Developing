import mongoose from "mongoose";

const UserWorkoutScheduleSchema = new mongoose.Schema({
    trainee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TraineeProfile",
        required: true
    },

    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainerProfile",
        required: true
    },

    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentMethod",
    },

    total_sessions: {
        type: Number,
        required: true
    },

    start_date: {
        type: Date,
        default: Date.now
    },

    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
    }

}, { timestamps: true });

export default mongoose.model("UserWorkoutSchedule", UserWorkoutScheduleSchema);
