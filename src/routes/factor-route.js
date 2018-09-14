import { Router } from 'express';
import { factorController } from '../controllers/factor-controller';

const routerOptions = {
	mergeParams: true
};

const router = Router(routerOptions);

router.post('/', factorController.create);
router.get('/', factorController.getAllByParent);
router.get('/:id', factorController.getSingle);
router.put('/:id', factorController.update);
router.delete('/:id', factorController.remove);

export default router;