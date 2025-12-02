import TraineeProfileModel from "../Models/TraineeProfileModel.js";
import axios from "axios";

class Trainee_Profile_Services {

    async createTraineeProfile(TraineeProfileData) {
        try {
            const { name, date_of_birth, gender, effort_level,gone_Days } = TraineeProfileData;
            const { first_name, middle_name, last_name } = name || {};

            // Calculate Age
            const calculateAge = (birthDate) => {
                const today = new Date();
                const birth = new Date(birthDate);
                let age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();

                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                    age--;
                }

                return age;
            };

            const age = calculateAge(date_of_birth);

            if (age < 0) throw new Error('Date of birth cannot be in the future');
            if (age > 150) throw new Error('Please enter a valid date of birth');

            // Save new Trainee Profile
            const newTrainee_Profile = new TraineeProfileModel({
                name: {
                    first_name: first_name?.trim() || '',
                    middle_name: middle_name ? middle_name.trim() : undefined,
                    last_name: last_name?.trim() || '',
                },
                gender: gender ? gender.toLowerCase() : undefined,
                age,
                date_of_birth,
                effort_level,
                gone_Days
            });

            await newTrainee_Profile.save();
            return newTrainee_Profile;

        } catch (error) {
            throw new Error(error.message || 'Error creating trainee profile');
        }
    }


    async uploadImage(Trainee_Profile_ID, profile_Image_URL) {
        try {
            if (!Trainee_Profile_ID) throw new Error('Trainee profile ID is required');
            if (!profile_Image_URL) throw new Error('Profile image URL is required');

            const updatedProfile = await TraineeProfileModel.findByIdAndUpdate(
                Trainee_Profile_ID,
                { profile_Image: profile_Image_URL },
                { new: true }
            );

            if (!updatedProfile) throw new Error('Trainee profile not found');

            return updatedProfile;

        } catch (error) {
            throw new Error(error.message || 'Error uploading profile image');
        }
    }

    async getTraineeProfile(Trainee_Profile_ID = null) {
        try {
            if (Trainee_Profile_ID) {
                // Find one by ID
                const profile = await TraineeProfileModel.findById(Trainee_Profile_ID)
                    .populate('SubscriptionPlan', 'name duration_weeks goal_type') // optional populate
                    .lean();

                if (!profile) throw new Error('Trainee profile not found');
                return profile;
            }

            // Return all profiles if no ID
            const allProfiles = await TraineeProfileModel.find()
                .populate('SubscriptionPlan', 'name duration_weeks goal_type')
                .lean();

            return allProfiles;
        } catch (error) {
            throw new Error(error.message || 'Error fetching trainee profile(s)');
        }
    }

    async updateTraineeName(Trainee_Profile_ID, nameData) {
        try {
            if (!Trainee_Profile_ID) throw new Error('Trainee profile ID is required');
            if (!nameData || typeof nameData !== 'object') throw new Error('Name data is required');

            const { first_name, middle_name, last_name } = nameData;

            // Validate inputs
            if (!first_name?.trim() || !last_name?.trim()) {
                throw new Error('First name and last name are required');
            }

            const updatedProfile = await TraineeProfileModel.findByIdAndUpdate(
                Trainee_Profile_ID,
                {
                    $set: {
                        'name.first_name': first_name.trim(),
                        'name.middle_name': middle_name ? middle_name.trim() : undefined,
                        'name.last_name': last_name.trim(),
                    }
                },
                { new: true }
            );

            if (!updatedProfile) throw new Error('Trainee profile not found');

            return updatedProfile;
        } catch (error) {
            throw new Error(error.message || 'Error updating trainee name');
        }
    }

    async getTraineesProfiles() {
        try {
            const allProfiles = await TraineeProfileModel.find()

            if (!allProfiles.length) throw new Error('No trainee profiles found');

            return allProfiles;
        } catch (error) {
            throw new Error(error.message || 'Error fetching trainee profiles');
        }
    }

    async getTraineesWithStrengthByTrainer(trainerGender) {
        if (!trainerGender) throw new Error("Trainer gender is required");

        // Convert to lowercase for case-insensitive match
        const genderLower = trainerGender.toLowerCase();

        const trainees = await TraineeProfileModel.find({
            gender: { $regex: new RegExp(`^${genderLower}$`, 'i') } // 'i' for case-insensitive
        }).lean();

        if (!trainees.length) throw new Error("No trainees found with this gender");

        const enrichedTrainees = await Promise.all(
            trainees.map(async (t) => {
                try {
                    const response = await axios.get(`http://13.48.6.75:5002/api/v1/strength-tracking/${t._id}`);
                    t.strength_tracking = response.data?.data || null;
                } catch (err) {
                    t.strength_tracking = null;
                }
                return t;
            })
        );

        return enrichedTrainees;
    }

}

export default new Trainee_Profile_Services();