import Trainer_Profile_Services from "../Services/Trainer_Profile_Services";
import type { Request, Response } from "express";

class Trainer_Profile_Controllers {

    async createTrainerProfile(req:Request, res:Response) {
        try {
            const data = req.body;
            const trainer = await Trainer_Profile_Services.createTrainerProfile(data);

            return res.status(201).json({
                success: true,
                message: "Trainer profile created successfully",
                data: trainer
            });

        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({
                success: false,
                error: message
            });
        }
    }

    async getTrainerProfile(req:Request, res:Response) {
        try {
            const { trainer_id } = req.params;

            const trainer = await Trainer_Profile_Services.getTrainerProfile(trainer_id);

            res.status(200).json({
                success: true,
                data: trainer
            });

        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({
                success: false,
                error: message
            });
        }
    }

    async getAllTrainers(req:Request, res:Response) {
        try {
            const trainers = await Trainer_Profile_Services.getAllTrainers();

            res.status(200).json({
                success: true,
                data: trainers
            });

        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({
                success: false,
                error: message
            });
        }
    }

    async updateTrainerName(req:Request, res:Response) {
        try {
            const { trainer_id } = req.params;
            const { name } = req.body;

            const updated = await Trainer_Profile_Services.updateTrainerName(trainer_id, name);

            res.status(200).json({
                success: true,
                data: updated
            });

        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(500).json({
                success: false,
                error: message
            });
        }
    }

    async updateFullTrainerProfile(req:Request, res:Response) {
        try {
            const { trainer_id } = req.params;
            const data = req.body;

            const updatedTrainer = await Trainer_Profile_Services.updateFullTrainerProfile(
                trainer_id,
                data
            );

            res.status(200).json({
                success: true,
                message: "Trainer profile updated successfully",
                data: updatedTrainer
            });

        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(400).json({
                success: false,
                error: message
            });
        }
    }

    async verifyTrainerProfile(req:Request, res:Response) {
        try {
            const { trainer_id } = req.params;
            const updatedTrainer = await Trainer_Profile_Services.verifyTrainer(trainer_id);

            res.status(200).json({
                success: true,
                message: "Trainer profile verified successfully",
                data: updatedTrainer
            });

        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(400).json({
                success: false,
                error: message
            });
        }
    }


}

export default new Trainer_Profile_Controllers();