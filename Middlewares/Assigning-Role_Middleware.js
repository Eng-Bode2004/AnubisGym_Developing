import UserModel from "../Models/UserModel.ts";

export default async function AssignRole(req, res, next) {
    try {
        const { RoleId } = req.body;
        const { userId } = req.params;

        if (!userId || !RoleId) {
            return res.status(400).json({
                status: 'error',
                message: 'User ID and Role ID are required',
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        req.RoleId = RoleId;
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
}
