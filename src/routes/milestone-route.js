import { Router } from 'express';
import { milestoneController } from '../controllers/milestone-controller';

const routerOptions = {
	mergeParams: true
};

const router = Router(routerOptions);

router.post('/', milestoneController.create);
router.get('/', milestoneController.getAllByParent);
router.get('/:id', milestoneController.getSingle);
router.put('/:id', milestoneController.update);
router.delete('/:id', milestoneController.remove);

export default router;