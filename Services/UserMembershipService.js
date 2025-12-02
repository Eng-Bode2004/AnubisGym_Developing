import axios from "axios";
import UserMembership from "../Models/UserMembership.js";

const PLAN_API = "http://13.48.6.75:5003/api/v1/subscription-plans/";

class UserMembershipService {

    async create({ Trainee_Profile, SubscriptionPlan, Payment_Method }) {
        if (!Trainee_Profile || !SubscriptionPlan || !Payment_Method) throw new Error("Missing required fields");

        // Fetch subscription plan
        const planRes = await axios.get(`${PLAN_API}${SubscriptionPlan}`);
        const plan = planRes.data?.data;
        if (!plan) throw new Error("Subscription plan not found");

        const duration_days = plan.duration_days;

        // Extract sessions
        let sessions = 0;
        if (plan.features?.length > 0) {
            const match = plan.features[0].match(/(\d+)/);
            sessions = match ? parseInt(match[1]) : 0;
        }

        const start_date = new Date();
        const end_date = new Date(start_date.getTime() + duration_days * 24 * 60 * 60 * 1000);

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

    // Decrease days automatically
    async decreaseDaily() {
        const memberships = await UserMembership.find();

        for (const m of memberships) {
            m.Days_left = Math.max(0, m.Days_left - 1); // Ensure non-negative

            if (m.Days_left === 0 || m.sessions_left === 0) {
                await m.deleteOne();
                continue;
            }

            await m.save();
        }
    }

    async reduceSession(id) {
        const membership = await UserMembership.findById(id);
        if (!membership) throw new Error("Membership not found");

        membership.sessions_left = Math.max(0, membership.sessions_left - 1);

        if (membership.sessions_left === 0) {
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

        const memberships = await UserMembership.find({ Trainee_Profile: traineeId });

        return await Promise.all(memberships.map(async (m) => {
            try {
                const planRes = await axios.get(`${PLAN_API}${m.SubscriptionPlan}`);
                m.SubscriptionPlanData = planRes.data?.data || {};
            } catch {
                m.SubscriptionPlanData = {};
            }
            return m;
        }));
    }
}

export default new UserMembershipService();
