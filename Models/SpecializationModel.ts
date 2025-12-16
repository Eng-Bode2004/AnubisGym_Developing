import mongoose from "mongoose"

const SpecializationModel = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },


    description: {
        type: String,
    },

    imageUrl:{
        type: String,
    }



})

export default mongoose.model('specialization', SpecializationModel)