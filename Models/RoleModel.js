import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },

    imageUrl:{
        type: String,
    }

});

export default mongoose.model("Role", RoleSchema);
