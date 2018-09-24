import { Router } from 'express';
import { factorController } from '../controllers/factor-controller';

const routerOptions = {
	mergeParams: true
};

const router = Router(routerOptions);

router.post('/', factorController.create);
router.get('/', factorController.getAllByParent);
router.get('/:factorId', factorController.getSingle);
router.put('/:factorId', factorController.update);
router.delete('/:factorId', factorController.remove);

export default router;