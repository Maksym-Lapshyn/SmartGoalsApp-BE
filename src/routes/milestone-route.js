import { Router } from 'express';
import { milestoneController } from '../controllers/milestone-controller';
import { factorController } from '../controllers/factor-controller';

const router = Router();

router.put('/:milestoneId', milestoneController.update);
router.delete('/:milestoneId', milestoneController.remove);
router.post('/:milestoneId/factors', factorController.create);
router.get('/:milestoneId/factors', factorController.getAllByParent);
router.get('/:milestoneId/factors/:factorId', factorController.getSingleByParent);

export default router;