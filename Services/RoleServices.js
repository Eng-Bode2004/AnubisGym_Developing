import RoleSchema from "../Models/RoleModel.js";

class RoleServices {

    async createRole(roleData) {
        try {
            const { name, imageUrl } = roleData;

            // Check if Role Exists
            const existRole = await RoleSchema.findOne({ name });
            if (existRole) throw new Error("Role already exists");

            // Create Role
            const newRole = await RoleSchema.create({
                name,
                imageUrl
            });

            return newRole;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllRoles() {
        try {
            const roles = await RoleSchema.find();

            // Optional: check if empty
            if (roles.length === 0) {
                throw new Error("No roles found");
            }

            return roles;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getRoleById(roleId) {
        try {
            const role = await RoleSchema.findById(roleId);
            if (!role) throw new Error("Role not found");

            return role;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteRoleById(roleId) {
        try {
            const deletedRole = await RoleSchema.findByIdAndDelete(roleId);
            if (!deletedRole) throw new Error("Role not found");

            return deletedRole;

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getRolesExcept(excludedId) {
        try {
            return await RoleSchema.find({ _id: { $ne: excludedId } });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateRole(roleId, updatedData) {
        try {
            const role = await RoleSchema.findById(roleId);
            if (!role) throw new Error("Role not found");

            // Update fields
            role.name = updatedData.name || role.name;
            role.imageUrl = updatedData.imageUrl || role.imageUrl;

            return await role.save();

        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new RoleServices();
