const axios = require("axios");
const UserMembership = require("../Models/Model");

const PLAN_API = "https://anubis-subscriptionplan.onrender.com/api/v2/subscription_plans/";

class UserMembershipService {

    async create({ Trainee_Profile, SubscriptionPlan, Payment_Method }) {

        if (!Trainee_Profile || !SubscriptionPlan || !Payment_Method) {
            throw new Error("Missing required fields");
        }

        // Fetch plan
        const planRes = await axios.get(`${PLAN_API}${SubscriptionPlan}`);
        const plan = planRes.data?.data;
        if (!plan) throw new Error("Subscription plan not found");

        const duration_days = plan.duration_days;

        // Extract sessions from features
        let sessions = 0;
        if (plan.features?.length > 0) {
            const match = plan.features[0].match(/(\d+)/);
            sessions = match ? parseInt(match[1]) : 0;
        }

        // Calculate dates
        const start_date = new Date();
        const end_date = new Date(start_date.getTime() + duration_days * 24 * 60 * 60 * 1000);

        // Save membership
        const membership = new UserMembership({
            Trainee_Profile,
            SubscriptionPlan,
            Payment_Method,
            start_date,
            end_date,
            Days_left: duration_days,
            sessions_left: sessions
        });

        await membership.save();
        return membership;
    }

    // Auto daily reduction
    async decreaseDaily() {
        const memberships = await UserMembership.find();

        for (const membership of memberships) {
            // Correct casing
            membership.Days_left -= 1;

            if (membership.Days_left <= 0 || membership.sessions_left <= 0) {
                await membership.deleteOne();
                continue;
            }

            try {
                await membership.save();
            } catch (err) {
                console.error("Failed to update membership:", err);
            }
        }
    }


    async reduceSession(id) {
        const membership = await UserMembership.findById(id);
        if (!membership) throw new Error("Membership not found");

        membership.sessions_left -= 1;

        if (membership.sessions_left <= 0) {
            await membership.deleteOne();
            return { message: "Membership expired (no sessions left)" };
        }

        await membership.save();
        return membership;
    }

    getAll() {
        return UserMembership.find();
    }

    getById(id) {
        return UserMembership.findById(id);
    }

    delete(id) {
        return UserMembership.findByIdAndDelete(id);
    }

    async getByTraineeId(traineeId) {
        if (!traineeId) throw new Error("Trainee ID is required");

        // Find memberships for this trainee
        const memberships = await UserMembership.find({ Trainee_Profile: traineeId });

        // Fetch subscription plan data for each membership
        const enrichedMemberships = await Promise.all(
            memberships.map(async (m) => {
                try {
                    const planRes = await axios.get(`${PLAN_API}${m.SubscriptionPlan}`);
                    const planData = planRes.data?.data || {};
                    m.SubscriptionPlanData = planData;
                } catch (err) {
                    m.SubscriptionPlanData = {}; // fallback
                }
                return m;
            })
        );

        return enrichedMemberships;
    }
}

module.exports = new UserMembershipService();
