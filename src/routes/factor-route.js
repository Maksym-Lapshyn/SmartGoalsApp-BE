import { Router } from 'express';
import { factorController } from '../controllers/factor-controller';
import { contributorController } from '../controllers/contributor-controller';

const router = Router();

router.get('/', factorController.getAll);
router.get('/:factorId', factorController.getSingle);
router.put('/:factorId', factorController.update);
router.delete('/:factorId', factorController.remove);
router.post('/:factorId/contributors', contributorController.create);
router.get('/:factorId/contributors', contributorController.getAllByParent);

export default router;