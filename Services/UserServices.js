import UserModel from "../Models/UserModel.ts";
const bcrypt = require('bcryptjs');
import jwt  from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Token expiration settings
const ACCESS_TOKEN_EXPIRES_IN = "15m"; // Access token lifespan
const REFRESH_TOKEN_EXPIRES_IN = "7d"; // Refresh token lifespan

class UserServices {
    async createUser(userData) {
        try {
            const { phone_Number, email, username, password } = userData;

            // --- Build dynamic $or query ---
            const conditions = [];
            if (phone_Number) conditions.push({ phone_Number });
            if (email) conditions.push({ email });
            if (username) conditions.push({ username });

            if (conditions.length > 0) {
                const existUser = await UserModel.findOne({ $or: conditions });
                if (existUser) {
                    // custom message for clarity
                    if (existUser.phone_Number === phone_Number)
                        throw new Error('Phone number already registered');
                    if (existUser.email === email)
                        throw new Error('Email already registered');
                    if (existUser.username === username)
                        throw new Error('Username already taken');
                }
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new UserModel({
                phone_Number: phone_Number || null,
                email: email || null,
                username,
                password: hashedPassword,
            });

            await user.save();
            return user;
        } catch (error) {
            throw new Error(error.message || 'Error while creating user');
        }
    }


    async AssignRole(userId,RoleId){
        try {

            // Check if User is its doesnt exists
            const existUser =  await UserModel.findById(userId);
            if (!existUser) {
                throw new Error('User not found');
            }

            // Assign Role
            const userRole = await UserModel.findByIdAndUpdate(userId,{
                $set: {Role: RoleId}


            },{ new: true })

            return userRole;

        }catch (error) {
            throw new Error(error.message || 'Error while assigning role');
        }

    }


    async assignProfile(userId, profileId) {
        try {
            // 1️⃣ Check if user exists
            const existUser = await UserModel.findById(userId);
            if (!existUser) {
                throw new Error('User not found');
            }


            // 3️⃣ Check if this profile already assigned to someone else
            const profileAlreadyAssigned = await UserModel.findOne({ Profile: profileId });
            if (profileAlreadyAssigned) {
                throw new Error('This profile is already assigned to another user');
            }

            // 4️⃣ Check if user already has a profile assigned
            if (existUser.Profile && existUser.Profile.toString() === profileId) {
                throw new Error('This profile is already assigned to this user');
            }

            // 5️⃣ Assign profile to user
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: { Profile: profileId } },
                { new: true }
            )// optional: populate profile details

            return updatedUser;

        } catch (error) {
            throw new Error(error.message || 'Error while assigning profile');
        }
    }


    async loginUser(userData) {
        try {
            const { identifier, password } = userData;

            if (!identifier || !password) {
                throw new Error("Email/Phone and Password are required");
            }

            // Find user by email or phone
            const query = identifier.includes("@")
                ? { email: identifier }
                : { phone_Number: identifier };

            const user = await UserModel.findOne(query);
            if (!user) throw new Error("User not found with provided credentials");

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) throw new Error("Invalid identifier or password");


            // Generate JWT Access Token
            const accessToken = jwt.sign(
                { userId: user._id, role: user.Role ,Profile:user.Profile , phone_Number:user.phone_Number,email:user.email,username:user.username },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
            );

            // Generate Refresh Token (random string)
            const refreshToken = crypto.randomBytes(64).toString("hex");

            // Hash refresh token before saving
            const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
            user.refreshToken = hashedRefreshToken;
            await user.save();

            // Prepare response without password
            const { password: _, refreshToken: __, ...userWithoutPassword } = user.toObject();
            userWithoutPassword.RoleId = user.Role ? user.Role.toString() : null;

            return {
                user: userWithoutPassword,
                accessToken,
                refreshToken, // Send plain refresh token to client
            };
        } catch (error) {
            throw new Error(error.message || "Error while logging in");
        }
    }

    async refreshAccessToken(userId, refreshToken) {
        const user = await UserModel.findById(userId);
        if (!user || !user.refreshToken) throw new Error("Invalid refresh token");

        const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isValid) throw new Error("Invalid refresh token");

        const newAccessToken = jwt.sign(
            { userId: user._id, role: user.Role ,Profile:Profile , phone_Number:phone_Number,email:email,username:username},
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
        );

        const newRefreshToken = crypto.randomBytes(64).toString("hex");
        user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
        await user.save();

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }


    async changeUsername(userId, newUsername) {
        try {
            if (!userId) throw new Error('User ID is required');
            if (!newUsername || typeof newUsername !== 'string')
                throw new Error('New username is required');

            // Validate username format
            if (newUsername.length < 5) {
                throw new Error('Username must be at least 7 characters long.');
            }
            const usernameRegex = /^[a-zA-Z0-9_.]+$/;
            if (!usernameRegex.test(newUsername)) {
                throw new Error('Username can only contain letters, numbers, underscores, and dots.');
            }

            // Check if username already exists
            const existingUser = await UserModel.findOne({ username: newUsername });
            if (existingUser) {
                throw new Error('Username already taken');
            }

            // Update the username
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: { username: newUsername } },
                { new: true }
            );

            if (!updatedUser) throw new Error('User not found');

            return updatedUser;
        } catch (error) {
            throw new Error(error.message || 'Error while changing username');
        }
    }



}

export default new UserServices();
