import { Router } from 'express';
import { factorController } from '../controllers/factor-controller';

const router = Router();

router.get('/', factorController.getAll);
router.get('/:factorId', factorController.getSingle);
router.put('/:factorId', factorController.update);
router.delete('/:factorId', factorController.remove);

export default router;