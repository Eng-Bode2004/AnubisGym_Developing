import mongoose from "mongoose"

const TrainerProfileModel = new mongoose.Schema({

    name: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        }
    },

    profile_image: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specialization",
        required: true
    },

    experience_years: {
        type: Number,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },

    total_reviews: {
        type: Number,
        default: 0
    },

    trainees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainee Profile"
    }],

    Gender:{
        type: String,
    }



})

export default mongoose.model('Trainer Profile', TrainerProfileModel)