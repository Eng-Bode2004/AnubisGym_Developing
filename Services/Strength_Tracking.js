import WeightTracker_Schema from "../Models/Weight_Tracker.ts";
import BMITracker_Schema from "../Models/BMI_Tracker.ts";
import HeightTracker_Schema from "../Models/Height_Tracker.ts";

class Strength_Tracking {
    async createOrUpdateStrength(strengthData) {
        try {
            const { current_weight, target_weight, height_cm, Trainee_Profile } = strengthData;

            // 🧩 Validate input
            if (!current_weight || !target_weight || !height_cm || !Trainee_Profile) {
                throw new Error("current_weight, target_weight, height_cm, and Trainee_Profile are required");
            }

            // 🧮 Weight calculations
            const weight_progress = (current_weight / target_weight)*100; // how far from target
            const weight_difference = target_weight-current_weight; // positive difference

            // 🧮 BMI calculations
            const heightInMeters = height_cm / 100; // convert to meters
            const bmi_value = (current_weight / (heightInMeters * heightInMeters)).toFixed(2);

            let bmi_status = "Normal";
            if (bmi_value < 18.5) bmi_status = "Underweight";
            else if (bmi_value < 25) bmi_status = "Normal";
            else if (bmi_value < 30) bmi_status = "Overweight";
            else bmi_status = "Obese";

            // 💾 Save/Update WeightTracker
            const weightRecord = await WeightTracker_Schema.findOneAndUpdate(
                { Trainee_Profile },
                {
                    current_weight,
                    target_weight,
                    weight_progress,
                    weight_difference,
                },
                { upsert: true, new: true }
            );

            // 💾 Save/Update HeightTracker
            const heightRecord = await HeightTracker_Schema.findOneAndUpdate(
                { Trainee_Profile },
                { height_cm },
                { upsert: true, new: true }
            );

            // 💾 Save/Update BMITracker
            const bmiRecord = await BMITracker_Schema.findOneAndUpdate(
                { Trainee_Profile },
                {
                    bmi_value,
                    bmi_status,
                },
                { upsert: true, new: true }
            );

            // ✅ Return all results
            return {
                weight: weightRecord,
                height: heightRecord,
                bmi: bmiRecord,
            };
        } catch (error) {
            throw new Error(error.message || "Error while creating/updating strength tracking");
        }
    }

    async getStrengthDataByProfileId(Trainee_Profile) {
        try {
            const weight = await WeightTracker_Schema.findOne({ Trainee_Profile }).select(
                "current_weight target_weight weight_progress weight_difference"
            );
            const height = await HeightTracker_Schema.findOne({ Trainee_Profile }).select("height_cm");
            const bmi = await BMITracker_Schema.findOne({ Trainee_Profile }).select("bmi_value bmi_status");

            if (!weight && !height && !bmi) {
                throw new Error("No strength tracking data found for this profile");
            }

            // ✅ Flatten and return only required fields
            return {
                bmi_status: bmi?.bmi_status || null,
                bmi_value: bmi?.bmi_value || null,
                height_cm: height?.height_cm || null,
                current_weight: weight?.current_weight || null,
                target_weight: weight?.target_weight || null,
                weight_progress: weight?.weight_progress || null,
                weight_difference: weight?.weight_difference || null,
            };
        } catch (error) {
            throw new Error(error.message || "Error fetching strength tracking data");
        }
    }
}

export default new Strength_Tracking();