import TrainerProfileModel from "../Models/TrainerProfileModel.js";
import axios from "axios";

class Trainer_Profile_Services {

    /* ===================== CREATE ===================== */
    async createTrainerProfile(data) {
        try {
            const {
                name,
                specialization,
                experience_years,
                profile_image,
                Gender
            } = data;

            const { first_name, last_name } = name;

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

    /* ===================== GET ONE ===================== */
    async getTrainerProfile(id) {
        const trainer = await TrainerProfileModel
            .findById(id)
            .populate("specialization")
            .populate("trainees");

        if (!trainer) throw new Error("Trainer not found");
        return trainer;
    }

    /* ===================== GET ALL ===================== */
    async getAllTrainers() {
        return await TrainerProfileModel
            .find()
            .populate("specialization");
    }

    /* ===================== UPDATE NAME ===================== */
    async updateTrainerName(id, nameData) {
        const { first_name, last_name } = nameData;

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

    /* ===================== UPDATE FULL PROFILE ===================== */
    async updateFullTrainerProfile(trainerId, data) {
        try {
            const trainer = await TrainerProfileModel.findById(trainerId);
            if (!trainer) throw new Error("Trainer not found");

            const updateData = {};

            if (data.specialization)
                updateData.specialization = data.specialization;

            if (data.experience_years !== undefined)
                updateData.experience_years = data.experience_years;

            if (data.profile_image)
                updateData.profile_image = data.profile_image;

            if (data.Gender)
                updateData.Gender = data.Gender;

            if (data.session_price !== undefined)
                updateData.session_price = data.session_price;

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

    /* ===================== VERIFY TRAINER ===================== */
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

    /* ===================== MATCH BY TRAINEE GENDER ===================== */

    TRAINEE_API_BASE =
        "https://trainee-profile.onrender.com/api/v1/trainee-profile";

    async getTrainersByTraineeGender(traineeProfileId) {

        // 1️⃣ Fetch trainee profile from external service
        const response = await axios.get(
            `${this.TRAINEE_API_BASE}/${traineeProfileId}`
        );

        if (!response.data || !response.data.success) {
            throw new Error("Failed to fetch trainee profile");
        }

        const traineeGender = response.data.data.gender;

        if (!traineeGender) {
            throw new Error("Trainee gender not found");
        }

        // 2️⃣ Fetch matching trainers
        const trainers = await TrainerProfileModel.find({
            Gender: traineeGender,
            isVerified: true
        })
            .populate("SpecializationModel");

        return {
            trainee_gender: traineeGender,
            total_trainers: trainers.length,
            trainers
        };
    }
}

export default new Trainer_Profile_Services();
