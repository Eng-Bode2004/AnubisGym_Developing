import express from "express";
import UserMembershipController from "../Controllers/UserMembershipController.js";

const router = express.Router();

router.post("/", UserMembershipController.create);
router.get("/", UserMembershipController.getAll);
router.get("/:id", UserMembershipController.getById);
router.put("/reduce-session/:id", UserMembershipController.reduceSession);
router.delete("/:id", UserMembershipController.delete);
router.get("/trainee/:traineeId", UserMembershipController.getByTrainee);

export default router;
