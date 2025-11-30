import express from 'express';

// Controller
import RoleControllers from "../Controllers/RoleControllers.js";

// Middlewares
import CreationProcess from "../Middlewares/CreationProcess.js";

// Router
const router = express.Router();

router.post('/',CreationProcess,RoleControllers.createRole);
router.get('/', RoleControllers.getAllRoles);
router.get('/:id', RoleControllers.getRoleById);
router.delete('/:id', RoleControllers.deleteRole);
router.put('/:id', RoleControllers.updateRole);
router.get('/exclude/:id', RoleControllers.getRolesExcept);

export default router;

