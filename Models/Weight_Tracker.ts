import mongoose from "mongoose"

const WeightTracker_Schema = new mongoose.Schema({
    current_weight: {
        type: Number,
        required: true,
    },
    target_weight: {
        type: Number,
        required: true,
    },
    weight_progress: {
        type: Number, // current_weight - target_weight (can be + or -)
    },
    weight_difference: {
        type: Number, // absolute difference Math.abs(current_weight - target_weight)
    },
    Trainee_Profile: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee_Profile",
        required: true,
    },

},{ timestamps: true });

export default mongoose.model('WeightTracker', WeightTracker_Schema)