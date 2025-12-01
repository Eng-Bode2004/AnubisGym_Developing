import express from "express";
import SpecializationControllers from "../Controllers/SpecializationControllers.ts";
import CreationProcess from "../Middleware/CreationProcess.js"

const router = express.Router();

// CRUD
router.post('/', CreationProcess,SpecializationControllers.create);
router.get('/', SpecializationControllers.getAll);
router.get('/:id', SpecializationControllers.getById);
router.put('/:id', SpecializationControllers.update);
router.delete('/:id', SpecializationControllers.delete);

export default router;