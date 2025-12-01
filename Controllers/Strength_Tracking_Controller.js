import Strength_Tracking from "../Services/Strength_Tracking.js";

class Strength_Tracking_Controller {
    async createOrUpdateStrength(req, res) {
        try {
            const { current_weight, target_weight, height_cm } = req.body;
            const { Trainee_Profile } = req.params; // comes from URL

            // Merge into one object to match the service method
            const strengthData = {
                current_weight,
                target_weight,
                height_cm,
                Trainee_Profile,
            };

            const result = await Strength_Tracking.createOrUpdateStrength(strengthData);

            res.status(200).json({
                status: "success",
                message: "Strength tracking data saved successfully",
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async getStrengthData(req, res) {
        try {
            const { Trainee_Profile } = req.params;
            const result = await Strength_Tracking.getStrengthDataByProfileId(Trainee_Profile);

            res.status(200).json({
                status: "success",
                message: "Strength tracking data fetched successfully",
                data: result,
            });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }
}

export default new Strength_Tracking_Controller();