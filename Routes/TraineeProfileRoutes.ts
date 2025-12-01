import express from 'express';

const router = express.Router();


// Calling Controller
import TraineeProfileController from "../Controllers/TraineeProfileController";
import validateTraineeProfileCreation from "../Middlewares/CreationProcess";

router.post('/', validateTraineeProfileCreation, TraineeProfileController.createTraineeProfile);
router.put('/profile-image/:Trainee_Profile',TraineeProfileController.uploadProfileImage)

router.get('/:Trainee_Profile', TraineeProfileController.getTraineeProfile);

// Update trainee name
router.put('/update-name/:Trainee_Profile', TraineeProfileController.updateTraineeName);

router.get('/', TraineeProfileController.getAllTrainees);

export default router;