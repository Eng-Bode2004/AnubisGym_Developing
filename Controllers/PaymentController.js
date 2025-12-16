import PaymentService from "../Services/PaymentService.js";
class PaymentController {

    async create(req, res) {
        try {
            const { traineeId, planId, payment_provider, payment_proof } = req.body;
            const payment = await PaymentService.createPayment({ traineeId, planId, payment_provider, payment_proof });
            res.status(201).json({ message: 'Payment created successfully', payment });
        } catch (err) {
            console.error(err);
            res.status(err.statusCode || 500).json({ message: err.message });
        }
    }


    // Complete payment
    async complete(req, res) {
        try {
            const { paymentId } = req.params;
            const payment = await PaymentService.completePayment(paymentId);
            res.json({ message: 'Payment completed successfully', payment });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Optional: get all payments
    async getAll(req, res) {
        try {
            const payments = await PaymentService.getAllPayments();
            res.json({ payments });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async getPending(req, res) {
        try {
            const payments = await PaymentService.getPendingPayments();
            res.json({ payments });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new PaymentController();