import mongoose from "mongoose"

const HeightTracker_Schema = new mongoose.Schema({
    height_cm: {
        type: Number,
    },
    Trainee_Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee_Profile",
        required: true,
    },


},{ timestamps: true });

export default mongoose.model('HeightTracker', HeightTracker_Schema)