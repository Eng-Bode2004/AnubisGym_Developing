import express from 'express';
const router = express.Router();
import SubscriptionPlan_Controllers from "../Controllers/SubscriptionPlan_Controllers";

// Create new subscription plan
router.post('/', SubscriptionPlan_Controllers.createPlan);

// Get all subscription plans
router.get('/', SubscriptionPlan_Controllers.getAllPlans);

// Get subscription plan by ID
router.get('/:id', SubscriptionPlan_Controllers.getPlanById);

router.delete('/:id',SubscriptionPlan_Controllers.deletePlanById)

router.put('/:id/discount', SubscriptionPlan_Controllers.updateDiscount);

router.put('/:id', SubscriptionPlan_Controllers.updatePlan);

export default router;