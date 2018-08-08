import { Router } from 'express';
import { getAllGoals, createGoal } from '../controllers/goal'

var router = Router();

router.get('/', function (req, res, next) {
	getAllGoals()
		.then(goals => {
			res.json(goals)
		})
		.catch(error => {
			return next(error)
		});
});

router.post('/', function (req, res, next) {
	createGoal(req.body)
		.then(goal => {
			res.json(goal)
		})
		.catch(error => {
			return next(error)
		});
});

export default router;