import mongoose from "mongoose";

const UserMembershipSchema = new mongoose.Schema({
    Trainee_Profile: { type: mongoose.Schema.Types.ObjectId, ref: "TraineeProfile", required: true },
    SubscriptionPlan: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlans", required: true },
    Payment_Method: { type: mongoose.Schema.Types.ObjectId, ref: "PaymentMethod", required: true },
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    status: { type: String, enum: ['active','cancelled','expired','suspended','pending'], default: 'active' },
    Days_left: { type: Number },
    sessions_left: { type: Number }
}, { timestamps: true });

export default mongoose.model("User_Membership", UserMembershipSchema);
