import { Router } from 'express';
import { milestoneController } from '../controllers/milestone-controller';

const routerOptions = {
	mergeParams: true
};

const router = Router(routerOptions);

router.post('/', milestoneController.create);
router.get('/', milestoneController.getAllByParent);
router.get('/:milestoneId', milestoneController.getSingle);
router.put('/:milestoneId', milestoneController.update);
router.delete('/:milestoneId', milestoneController.remove);

export default router;