import mongoose from "mongoose"

const SubscriptionPlanModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    currency: {
        type: String,
        default: 'EGP',
        enum: ['EGP', 'USD', 'EUR', 'GBP']
    },

    discount_percent: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    support_level: {
        type: String,
        enum: ['Basic', 'Standard', 'Premium'],
        default: 'Basic'
    },

    features: {
        type: [String],
        default: []
    },

    description: {
        type: String,
        trim: true
    },

    duration_days: {
        type: Number,
        required: true,
        min: 1
    },

    Admin_Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin_Profile',
    },

    included_workout_plans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WorkoutPlan'
        }
    ]



})

export default mongoose.model('Subscription Plan', SubscriptionPlanModel)