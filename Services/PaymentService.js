import axios from "axios";
import PaymentMethodModel from "../Model/PaymentMethodModel.js";
const PLAN_API = "http://13.48.6.75:5003/api/v1/subscription-plans/";

class PaymentService {

     async createPayment({ traineeId, planId, payment_provider, payment_proof }) {
        if (!traineeId || !planId || !payment_provider || !payment_proof) {
            const error = new Error('Missing required fields');
            error.statusCode = 400; // mark as client error
            throw error;
        }

        let planData;
        try {
            const response = await axios.get(`${PLAN_API}${planId}`);
            planData = response.data?.data;
            if (!planData) {
                const error = new Error('Subscription plan not found');
                error.statusCode = 404;
                throw error;
            }
        } catch (err) {
            const error = new Error(
                `Failed to fetch subscription plan: ${err.response?.data?.message || err.message}`
            );
            error.statusCode = err.response?.status || 502; // 502 Bad Gateway for upstream errors
            throw error;
        }

        // create payment
        const payment = new PaymentMethodModel({
            Trainee_Profile: traineeId,
            SubscriptionPlan: planId,
            amount: planData.price,
            payment_provider,
            payment_proof,
            status: 'pending'
        });

        try {
            await payment.save();
        } catch (err) {
            const error = new Error('Failed to save payment: ' + err.message);
            error.statusCode = 500;
            throw error;
        }

        return payment;
    }

    async completePayment(paymentId) {
        const payment = await PaymentMethodModel.findById(paymentId);
        if (!payment) throw new Error('Payment not found');

        payment.status = 'completed';
        payment.paid_at = new Date();
        await payment.save();

        return payment;
    }

    async getAllPayments() {
        return PaymentMethodModel.find();
    }

    async getPendingPayments() {
        return PaymentMethodModel.find({ status: 'pending' });
    }
}

export default new PaymentService();