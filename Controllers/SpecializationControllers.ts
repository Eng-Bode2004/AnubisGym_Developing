import type { Request, Response } from "express";
import SpecializationServices from "../Services/SpecializationServices";

class SpecializationControllers {
    async create(req:Request, res:Response) {
        try {
            const specialization = await SpecializationServices.createSpecialization(req.body);
            res.status(201).json({ success: true, data: specialization });
        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(400).json({ success: false, message: message });
        }
    }

    async getAll(req:Request, res:Response) {
        try {
            const specializations = await SpecializationServices.getAllSpecializations();
            res.status(200).json({ success: true, data: specializations });
        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(400).json({ success: false, message: message });
        }
    }

    async getById(req:Request, res:Response) {
        try {
            const specialization = await SpecializationServices.getSpecializationById(req.params.id);
            res.status(200).json({ success: true, data: specialization });
        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(404).json({ success: false, message: message });
        }
    }

    async update(req:Request, res:Response) {
        try {
            const updated = await SpecializationServices.updateSpecialization(req.params.id, req.body);
            res.status(200).json({ success: true, data: updated });
        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(400).json({ success: false, message: message });
        }
    }

    async delete(req:Request, res:Response) {
        try {
            const deleted = await SpecializationServices.deleteSpecialization(req.params.id);
            res.status(200).json({ success: true, data: deleted });
        } catch (error:unknown) {

            const message = error instanceof Error ? error.message : "Internal server error";
            res.status(404).json({ success: false, message: message });
        }
    }

}

export default new SpecializationControllers();