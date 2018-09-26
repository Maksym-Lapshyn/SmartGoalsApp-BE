import { Router } from 'express';
import { contributorController } from '../controllers/contributor-controller';

const routerOptions = {
	mergeParams: true
};

const router = Router(routerOptions);

router.post('/', contributorController.create);
router.get('/', contributorController.getAllByParent);
router.get('/:contributorId', contributorController.getSingleByParent);
router.put('/:contributorId', contributorController.update);
router.delete('/:contributorId', contributorController.remove);

export default router;