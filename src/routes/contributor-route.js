import { Router } from 'express';
import { contributorController } from '../controllers/contributor-controller';

const router = Router();

router.get('/', contributorController.getAll);
router.get('/:contributorId', contributorController.getSingle);
router.put('/:contributorId', contributorController.update);
router.delete('/:contributorId', contributorController.remove);

export default router;