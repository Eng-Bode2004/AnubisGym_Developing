import type { Request, Response } from "express";
import UserServices from "../Services/UserServices";

class UserControllers {

    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;

            const user = await UserServices.createUser(userData);

            return res.status(200).json({
                status: "success",
                user,
                statusCode: 200,
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Internal server error";

            return res.status(500).json({
                status: "error",
                statusCode: 500,
                error: message,
            });
        }
    }

    async AssignRole(req: Request, res: Response) {
        try {
            const { RoleId } = req.body;
            const { userId } = req.params;

            const UserRole = await UserServices.AssignRole(userId, RoleId);

            return res.status(200).json({
                status: "success",
                message: "Role assigned successfully",
                data: UserRole,
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Internal server error";

            return res.status(500).json({
                status: "error",
                statusCode: 500,
                error: message,
            });
        }
    }

    async assignProfile(req: Request, res: Response) {
        try {
            const { profileId } = req.body;
            const { userId } = req.params;

            if (!profileId) {
                return res.status(400).json({
                    status: "error",
                    message: "Profile ID is required in the body",
                });
            }

            const updatedUser = await UserServices.assignProfile(userId, profileId);

            return res.status(200).json({
                status: "success",
                message: "Profile assigned successfully",
                data: updatedUser,
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Internal server error";

            return res.status(500).json({
                status: "error",
                statusCode: 500,
                error: message,
            });
        }
    }

    async loginUser(req: Request, res: Response) {
        try {
            const { identifier, password } = req.body;

            const user = await UserServices.loginUser({ identifier, password });

            return res.status(200).json({
                status: "success",
                message: "Login successful",
                data: user,
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Invalid login";

            return res.status(400).json({
                status: "error",
                message,
            });
        }
    }

    async changeUsername(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { newUsername } = req.body;

            if (!newUsername) {
                return res.status(400).json({
                    status: "error",
                    message: "New username is required",
                });
            }

            const updatedUser = await UserServices.changeUsername(userId, newUsername);

            return res.status(200).json({
                status: "success",
                message: "Username changed successfully",
                data: updatedUser,
            });

        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Internal server error";

            return res.status(400).json({
                status: "error",
                message,
            });
        }
    }

    async regenerateRefreshToken(req: Request, res: Response) {
        try {
            const { userId, refreshToken } = req.body;

            if (!userId || !refreshToken) {
                return res.status(400).json({
                    status: "error",
                    message: "User ID and refresh token are required",
                });
            }

            const tokens = await UserServices.refreshAccessToken(userId, refreshToken);

            return res.status(200).json({
                status: "success",
                message: "Tokens regenerated successfully",
                data: tokens,
            });
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to regenerate tokens";

            return res.status(400).json({
                status: "error",
                message,
            });
        }
    }
}

export default new UserControllers();
