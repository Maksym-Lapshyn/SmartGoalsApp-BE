import { Router } from 'express';
import { goalController } from '../controllers/goal-controller';

const router = Router();

router.post('/', goalController.create);
router.get('/', goalController.getAll);
router.get('/:goalId', goalController.getSingle);
router.put('/:goalId', goalController.update);
router.delete('/:goalId', goalController.remove);

export default router;