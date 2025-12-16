import UserWorkoutSchedule from "../Models/User_Workout_Schedule.js";
import PaymentMethod from "../Models/PaymentMethodModel.js";

class UserWorkoutScheduleService {

    // Create schedule (only after payment completed)
    async createSchedule(data) {
        const {
            trainee,
            coach,
            total_sessions,
            start_date
        } = data;

        if (!trainee || !coach || !total_sessions) {
            throw new Error("Missing required fields");
        }


        return await UserWorkoutSchedule.create({
            trainee,
            coach,
            total_sessions,
            start_date
        });
    }

    // Get schedules by trainee
    async getByTrainee(traineeId) {
        return UserWorkoutSchedule
            .find({ trainee: traineeId })
            .populate("coach payment");
    }

    // Get schedules by coach
    async getByCoach(coachId) {
        return UserWorkoutSchedule
            .find({ coach: coachId })
            .populate("trainee payment");
    }

    // Get schedule by ID
    async getById(id) {
        const schedule = await UserWorkoutSchedule
            .findById(id)
            .populate("trainee coach payment");

        if (!schedule) throw new Error("Schedule not found");
        return schedule;
    }

    // Update schedule (sessions / status)
    async updateSchedule(id, data) {
        const schedule = await UserWorkoutSchedule.findById(id);
        if (!schedule) throw new Error("Schedule not found");

        Object.assign(schedule, data);
        await schedule.save();

        return schedule;
    }

    // Cancel schedule
    async cancelSchedule(id) {
        const schedule = await UserWorkoutSchedule.findById(id);
        if (!schedule) throw new Error("Schedule not found");

        schedule.status = "cancelled";
        await schedule.save();

        return schedule;
    }

    async attachPayment(scheduleId, paymentId) {

        const schedule = await UserWorkoutSchedule.findById(scheduleId);
        if (!schedule) throw new Error("Schedule not found");

        const payment = await PaymentMethod.findById(paymentId);
        if (!payment) throw new Error("Payment not found");

        schedule.payment = payment._id;
        schedule.payment_status = payment.status;
        await schedule.save();

        return schedule;
    }

}

export default new UserWorkoutScheduleService();
