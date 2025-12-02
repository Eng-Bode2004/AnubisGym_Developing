import mongoose from "mongoose"

const PostModel = new mongoose.Schema({
    Post_url: {
        type: String,
        required: true,
        trim: true
    },


},{timestamps:true})

export default mongoose.model('Post', PostModel)