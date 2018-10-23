import { Router } from 'express';
import { milestoneController } from '../controllers/milestone-controller';
import { factorController } from '../controllers/factor-controller';

const router = Router();

router.get('/:milestoneId', milestoneController.getSingle);
router.put('/:milestoneId', milestoneController.update);
router.delete('/:milestoneId', milestoneController.remove);
router.post('/:milestoneId/factors', factorController.create);
router.get('/:milestoneId/factors', factorController.getAllByParent);
router.put('/:milestoneId/factors/:factorId', factorController.linkToParent);
router.delete('/:milestoneId/factors/:factorId', factorController.unlinkFromParent);

export default router;