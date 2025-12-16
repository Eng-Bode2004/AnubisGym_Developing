import express from "express";
const router = express.Router();

import validateTrainerProfileCreation from "../Middlewares/CreationProcess";
import TrainerProfileController from "../Controller/TrainerProfileController.ts";

router.post('/', validateTrainerProfileCreation, TrainerProfileController.createTrainerProfile);

router.get('/:trainer_id', TrainerProfileController.getTrainerProfile);

router.get('/', TrainerProfileController.getAllTrainers);

router.put('/update-name/:trainer_id', TrainerProfileController.updateTrainerName);

router.put('/update/:trainer_id', TrainerProfileController.updateFullTrainerProfile);

router.put('/verify/:trainer_id', TrainerProfileController.verifyTrainerProfile);

router.get("/by-trainee-gender/:trainee_profile_id", TrainerProfileController.getTrainersByTraineeGender
);

export default router;
