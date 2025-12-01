import TrainerProfileModel from "../Models/TrainerProfileModel.js";

class Trainer_Profile_Services {

    async createTrainerProfile(data) {
        try {
            const { name, specialization, experience_years, profile_image , Gender } = data;
            const { first_name, middle_name, last_name } = name

            const newTrainer = new TrainerProfileModel({
                name: {
                    first_name: first_name.trim(),
                    last_name: last_name.trim()
                },
                specialization,
                experience_years,
                profile_image,
                Gender
            });

            await newTrainer.save();
            return newTrainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }

    async getTrainerProfile(id) {
        const trainer = await TrainerProfileModel.findById(id)

        if (!trainer) throw new Error("Trainer not found");
        return trainer;
    }

    async getAllTrainers() {
        return await TrainerProfileModel.find()
    }

    async updateTrainerName(id, nameData) {
        const { first_name, middle_name, last_name } = nameData;

        const updated = await TrainerProfileModel.findByIdAndUpdate(
            id,
            {
                $set: {
                    "name.first_name": first_name.trim(),
                    "name.last_name": last_name.trim()
                }
            },
            { new: true }
        );

        if (!updated) throw new Error("Trainer not found");
        return updated;
    }

    async updateFullTrainerProfile(trainerId, data) {
        try {
            const {
                specialization,
                experience_years,
                profile_image,
            } = data;

            // Check trainer exists
            const trainer = await TrainerProfileModel.findById(trainerId);
            if (!trainer) throw new Error("Trainer not found");

            const updateData = {};

            const updatedTrainer = await TrainerProfileModel.findByIdAndUpdate(
                trainerId,
                { $set: updateData },
                { new: true }
            );

            return updatedTrainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }

    async verifyTrainer(trainerId) {
        try {
            const trainer = await TrainerProfileModel.findById(trainerId);
            if (!trainer) throw new Error("Trainer not found");

            trainer.isVerified = true;
            await trainer.save();

            return trainer;

        } catch (err) {
            throw new Error(err.message);
        }
    }


}

export default new Trainer_Profile_Services();