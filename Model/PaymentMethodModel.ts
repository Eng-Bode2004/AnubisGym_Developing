import mongoose from "mongoose"

const PaymentMethodModel = new mongoose.Schema({
    Trainee_Profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TraineeProfile',
        required: true,
    },

    trainee_data: {
        type: Object
    },

    SubscriptionPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubscriptionPlans',
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    payment_provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PaymentProvider',
    },

    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
    },

    payment_proof: {
        type: String,
    },

    paid_at: {
        type: Date,
    },



},{timestamps:true})

export default mongoose.model('PaymentMethodWorkoutPlans', PaymentMethodModel)