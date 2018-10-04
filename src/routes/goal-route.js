import { Router } from 'express';
import { goalController } from '../controllers/goal-controller';
import { milestoneController } from '../controllers/milestone-controller';

const router = Router();

router.post('/', goalController.create);
router.get('/', goalController.getAll);
router.get('/:goalId', goalController.getSingle);
router.put('/:goalId', goalController.update);
router.delete('/:goalId', goalController.remove);
router.post('/:goalId/milestones', milestoneController.create);
router.get('/:goalId/milestones', milestoneController.getAllByParent);
router.get('/:goalId/milestones/:milestoneId', milestoneController.getSingleByParent);

export default router;