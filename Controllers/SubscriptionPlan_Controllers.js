import SubscriptionPlan_Services from "../Services/SubscriptionPlan_Services.js";

class SubscriptionPlan_Controller {
    async createPlan(req, res) {
        try {
            const planData = req.body;
            if (!planData.name || !planData.price || !planData.duration_days) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: name, price, duration_days, or Admin_Profile'
                });
            }

            const newPlan = await SubscriptionPlan_Services.createSubscriptionPlan(planData);
            res.status(201).json({
                success: true,
                message: 'Subscription plan created successfully',
                data: newPlan
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllPlans(req, res) {
        try {
            const plans = await SubscriptionPlan_Services.getAllPlans();
            res.status(200).json({
                success: true,
                message: 'All subscription plans retrieved successfully',
                data: plans
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getPlanById(req, res) {
        try {
            const { id } = req.params;
            const plan = await SubscriptionPlan_Services.getPlanById(id);
            res.status(200).json({
                success: true,
                message: 'Subscription plan retrieved successfully',
                data: plan
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deletePlanById(req, res) {
        try {
            const planId = req.params['id'];
            const deletedPlan = await SubscriptionPlan_Services.deletePlanById(planId);
            return res.status(200).json({
                success: true,
                message: "Subscription plan deleted successfully",
                data: deletedPlan
            });

        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,

            });
        }
    }

    async updateDiscount(req, res) {
        try {
            const { id } = req.params;
            const { discount_percent } = req.body;

            if (discount_percent == null)
                return res.status(400).json({ success: false, message: "discount_percent is required" });

            if (discount_percent < 0 || discount_percent > 100)
                return res.status(400).json({ success: false, message: "discount_percent must be between 0 and 100" });

            const plan = await SubscriptionPlan_Services.updatePlanDiscount(id, discount_percent);

            res.status(200).json({
                success: true,
                message: "Discount updated successfully",
                data: plan
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updatePlan(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const plan = await SubscriptionPlan_Services.updateSubscriptionPlan(id, updates);

            res.status(200).json({
                success: true,
                message: "Subscription plan updated successfully",
                data: plan
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

}

export default new SubscriptionPlan_Controller();