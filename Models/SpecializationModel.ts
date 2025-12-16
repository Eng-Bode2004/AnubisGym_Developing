// Models/SpecializationModel.js
import mongoose from "mongoose";

const SpecializationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    imageUrl: String
});

export default mongoose.model("Specialization", SpecializationSchema);
