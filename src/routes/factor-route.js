import { Router } from 'express';
import { factorController } from '../controllers/factor-controller';
import { contributorController } from '../controllers/contributor-controller';

const router = Router();

router.get('/', factorController.getAll);
router.get('/:factorId', factorController.getSingle);
router.put('/:factorId', factorController.update);
router.delete('/:factorId', factorController.remove);
router.post('/:factorId/contributors', contributorController.addToParent);
router.get('/:factorId/contributors', contributorController.getAllByParent);
router.put('/:factorId/contributors/:contributorId', contributorController.linkToParent);
router.delete('/:factorId/contributors/:contributorId', contributorController.unlinkFromParent);

export default router;