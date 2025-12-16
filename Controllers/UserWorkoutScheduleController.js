import UserWorkoutScheduleService from "../Services/UserWorkoutScheduleService.js";

class UserWorkoutScheduleController {

    // Create
    async create(req, res) {
        try {
            const schedule = await UserWorkoutScheduleService.createSchedule(req.body);
            res.status(201).json({
                success: true,
                data: schedule
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    // Get by trainee
    async getByTrainee(req, res) {
        try {
            const data = await UserWorkoutScheduleService.getByTrainee(req.params.traineeId);
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Get by coach
    async getByCoach(req, res) {
        try {
            const data = await UserWorkoutScheduleService.getByCoach(req.params.coachId);
            res.json({ success: true, data });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Get by ID
    async getById(req, res) {
        try {
            const schedule = await UserWorkoutScheduleService.getById(req.params.id);
            res.json({ success: true, data: schedule });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    // Update
    async update(req, res) {
        try {
            const updated = await UserWorkoutScheduleService.updateSchedule(
                req.params.id,
                req.body
            );
            res.json({ success: true, data: updated });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Cancel
    async cancel(req, res) {
        try {
            const cancelled = await UserWorkoutScheduleService.cancelSchedule(req.params.id);
            res.json({ success: true, data: cancelled });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    async attachPayment(req, res) {
        try {
            const { scheduleId, paymentId } = req.body;

            const data = await UserWorkoutScheduleService.attachPayment(
                scheduleId,
                paymentId
            );

            res.json({ success: true, data });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

export default new UserWorkoutScheduleController();
