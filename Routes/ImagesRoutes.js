const express = require('express');
const router = express.Router();
const ImagesControllers = require('../Controllers/ImagesControllers');



                            // Upload User Profile Image //

const specializations = require('../Middlewares/Multer-Specializations-Images'); // parser
router.post('/specialization', specializations.single('image'), ImagesControllers.uploadPhoto);

const trainer_profile = require('../Middlewares/Multer-TrainerProfile-Image'); // parser
router.post('/trainer-profile', trainer_profile.single('image'), ImagesControllers.uploadPhoto);

const trainee_profile = require('../Middlewares/Multer-TraineeProfile-Image'); // parser
router.post('/trainee-profile', trainee_profile.single('image'), ImagesControllers.uploadPhoto);

const payment_proof = require('../Middlewares/Multer-TrainerProfile-Image'); // parser
router.post('/payment-proof', trainer_profile.single('image'), ImagesControllers.uploadPhoto);




module.exports = router;
