import TraineeProfileServices from "../Services/TraineeProfileServices.js";

class Trainee_Profile_Controllers {
    async createTraineeProfile(req, res) {
        try {
            const TraineeProfileData = req.body;

            if (!TraineeProfileData || Object.keys(TraineeProfileData).length === 0) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: 'Profile data is required in request body',
                });
            }

            const result = await TraineeProfileServices.createTraineeProfile(TraineeProfileData);

            res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Trainee profile created successfully',
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: 'Internal error occurred',
                error: error.message,
            });
        }
    }


    async uploadProfileImage(req, res) {
        try {
            const { Trainee_Profile } = req.params;
            const {profile_Image} = req.body;

            const updatedProfile = await TraineeProfileServices.uploadImage(Trainee_Profile, profile_Image);

            res.status(200).json({
                success: true,
                message: 'Profile image uploaded successfully',
                data: updatedProfile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getTraineeProfile(req, res) {
        try {
            const { Trainee_Profile } = req.params; // optional param
            const profileData = await TraineeProfileServices.getTraineeProfile(Trainee_Profile);

            res.status(200).json({
                success: true,
                message: 'Trainee profile(s) retrieved successfully',
                data: profileData,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }


    async updateTraineeName(req, res) {
        try {
            const { Trainee_Profile } = req.params;
            const { name } = req.body;

            const updatedProfile = await TraineeProfileServices.updateTraineeName(Trainee_Profile, name);

            res.status(200).json({
                success: true,
                message: 'Trainee name updated successfully',
                data: updatedProfile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    async getAllTrainees(req, res) {
        try {
            const profiles = await TraineeProfileServices.getTraineesProfiles();
            res.status(200).json({
                success: true,
                message: 'All trainee profiles retrieved successfully',
                data: profiles
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

}

export default new Trainee_Profile_Controllers();