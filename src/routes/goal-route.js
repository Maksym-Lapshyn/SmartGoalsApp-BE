import { Router } from 'express';
import { goalController } from '../controllers/goal-controller'

const router = Router();

router.post('/', goalController.create);
router.get('/', goalController.getAll);
router.get('/:id', goalController.getSingle);
router.put('/:id', goalController.update);
router.delete('/:id', goalController.remove);

export default router;