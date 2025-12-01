import express from "express";
const router = express.Router();
import Strength_Tracking_Controller from "../Controllers/Strength_Tracking_Controller";

router.post("/:Trainee_Profile", Strength_Tracking_Controller.createOrUpdateStrength);

// GET: return only selected fitness fields
router.get("/:Trainee_Profile", Strength_Tracking_Controller.getStrengthData);


export default router;