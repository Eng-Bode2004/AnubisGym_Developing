import RoleServices from '../Services/RoleServices.js';

class RoleController {

    async createRole(req, res) {
        try {
            const roleData = req.body;
            const newRole = await RoleServices.createRole(roleData);

            return res.status(201).json({
                message: 'Role created successfully.',
                success: true,
                role: newRole
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Error creating role",
                error: error.message
            });
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await RoleServices.getAllRoles();
            return res.status(200).json({
                success: true,
                roles
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getRoleById(req, res) {
        try {
            const role = await RoleServices.getRoleById(req.params.id);
            return res.status(200).json({
                success: true,
                role
            });

        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async deleteRole(req, res) {
        try {
            const deleted = await RoleServices.deleteRoleById(req.params.id);
            return res.status(200).json({
                success: true,
                message: "Role deleted successfully",
                deletedRole: deleted
            });

        } catch (error) {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    async updateRole(req, res) {
        try {
            const updatedRole = await RoleServices.updateRole(req.params.id, req.body);
            return res.status(200).json({
                success: true,
                message: "Role updated successfully",
                role: updatedRole
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async getRolesExcept(req, res) {
        try {
            const roles = await RoleServices.getRolesExcept(req.params.id);
            return res.status(200).json({
                success: true,
                roles
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default new RoleController();
