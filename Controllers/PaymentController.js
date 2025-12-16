import PaymentService from "../Services/PaymentService.js";

class PaymentController {

    async create(req, res) {
        try {
            const payment = await PaymentService.createPayment(req.body);
            res.status(201).json({
                success: true,
                data: payment
            });
        } catch (err) {
            res.status(err.statusCode || 500).json({
                success: false,
                message: err.message
            });
        }
    }

    async complete(req, res) {
        try {
            const payment = await PaymentService.completePayment(req.params.paymentId);
            res.json({ success: true, data: payment });
        } catch (err) {
            res.status(400).json({ success: false, message: err.message });
        }
    }

    async getAll(req, res) {
        const payments = await PaymentService.getAllPayments();
        res.json({ success: true, count: payments.length, data: payments });
    }

    async getPendingByTrainer(req, res) {
        const payments = await PaymentService.getPendingByTrainer(req.params.trainerId);
        res.json({ success: true, count: payments.length, data: payments });
    }
}

export default new PaymentController();
