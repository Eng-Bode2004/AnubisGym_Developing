import SpecializationModel from "../Models/SpecializationModel.js";


class SpecializationServices {
    async createSpecialization(data) {
        const { name, description, imageUrl } = data;

        if (!name || !imageUrl) {
            throw new Error("Name and imageUrl are required");
        }

        const exists = await SpecializationModel.findOne({ name });
        if (exists) throw new Error("Specialization already exists");

        const specialization = await SpecializationModel.create({ name, description, imageUrl });
        return specialization;
    }

    async getAllSpecializations() {
        return await SpecializationModel.find();
    }

    async getSpecializationById(id) {
        const specialization = await SpecializationModel.findById(id);
        if (!specialization) throw new Error("Specialization not found");
        return specialization;
    }

    async updateSpecialization(id, data) {
        const specialization = await SpecializationModel.findById(id);
        if (!specialization) throw new Error("Specialization not found");

        specialization.name = data.name || specialization.name;
        specialization.description = data.description || specialization.description;
        specialization.imageUrl = data.imageUrl || specialization.imageUrl;

        return await specialization.save();
    }

    async deleteSpecialization(id) {
        const deleted = await SpecializationModel.findByIdAndDelete(id);
        if (!deleted) throw new Error("Specialization not found");
        return deleted;
    }

}


export default new SpecializationServices();