import UserControllers from "../Controllers/UserControllers.ts";
import createUserMiddleware from "../Middlewares/Create-User_Middleware.js"
import AssignRoleMiddleware from "../Middlewares/Assigning-Role_Middleware.js"


import express from "express";
const router = express.Router();

// Create new User

router.post('/register', createUserMiddleware,UserControllers.createUser);
router.put('/:userId/assign-role',AssignRoleMiddleware,UserControllers.AssignRole)
router.post('/:userId/assign-profile', UserControllers.assignProfile);
router.post('/login', UserControllers.loginUser);
router.put('/:userId/change-username', UserControllers.changeUsername);
router.post('/refresh-token', UserControllers.regenerateRefreshToken);



export default router;