import { Router } from 'express';
import { createGoal, getAllGoals, getSingleGoal, updateGoal, deleteGoal } from '../controllers/goal'

const router = Router();

router.post('/', createGoal);
router.get('/', getAllGoals);
router.get('/:id', getSingleGoal);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router