import { Router } from 'express';
import { milestoneController } from '../controllers/milestone-controller';

const router = Router();

router.put('/:milestoneId', milestoneController.update);
router.delete('/:milestoneId', milestoneController.remove);

export default router;