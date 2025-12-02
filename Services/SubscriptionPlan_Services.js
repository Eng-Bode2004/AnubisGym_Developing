import SubscriptionPlanModel from "../Models/SubscriptionPlanModel.js";

class SubscriptionPlan_Service {
    async createSubscriptionPlan(planData) {
        try {
            const newPlan = new SubscriptionPlanModel(planData);
            await newPlan.save();
            return newPlan;
        } catch (error) {
            throw new Error(error.message || 'Error creating subscription plan');
        }
    }

    async getAllPlans() {
        try {
            return await SubscriptionPlanModel.find()
        } catch (error) {
            throw new Error(error.message || 'Error fetching subscription plans');
        }
    }

    async getPlanById(planId) {
        try {
            const plan = await SubscriptionPlanModel.findById(planId)
            if (!plan) throw new Error('Subscription plan not found');
            return plan;
        } catch (error) {
            throw new Error(error.message || 'Error fetching subscription plan');
        }
    }

    async deletePlanById(planId) {
        try {
            const deletedPlan = await SubscriptionPlanModel.findByIdAndDelete(planId);

            if (!deletedPlan) {
                throw new Error('Subscription plan not found');
            }

            return deletedPlan;

        } catch (error) {
            throw new Error(error.message || 'Error deleting subscription plan');
        }
    }

    async updatePlanDiscount(planId, discount_percent) {
        try {
            const plan = await SubscriptionPlanModel.findById(planId);
            if (!plan) throw new Error("Subscription plan not found");

            plan.discount_percent = discount_percent;

            const discountedPrice =
                plan.price - (plan.price * discount_percent / 100);

            plan.price = Number(discountedPrice.toFixed(2));

            await plan.save();

            return plan;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateSubscriptionPlan(planId, updates) {
        try {
            const updatedPlan = await SubscriptionPlanModel.findByIdAndUpdate(
                planId,
                updates,
                { new: true, runValidators: true }
            );

            if (!updatedPlan)
                throw new Error("Subscription plan not found");

            return updatedPlan;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

export default new SubscriptionPlan_Service();