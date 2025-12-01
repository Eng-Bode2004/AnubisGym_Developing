import mongoose from "mongoose"

const TraineeProfileModel = new mongoose.Schema({

    name:{
        first_name:{
            type:String,
            required:true
        },

        last_name:{
            type:String,
            required:true,
        },
    },


    date_of_birth:{
        type:Date,
        required:true,
    },


    age:{
        type:Number,
    },

    profile_Image:{
        type:String,
    },

    is_Subscribed:{
        type:Boolean,
        default:false,
    },


    SubscriptionPlan:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subscription',
    },

    gender:{
        type:String,
        required:true,
        enum: ['male', 'female'],
    },

    effort_level:{
        type:String,
        enum: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
    },

    gone_Days :{
        type:Number,
    },



})

export default mongoose.model('Trainee Profile', TraineeProfileModel)