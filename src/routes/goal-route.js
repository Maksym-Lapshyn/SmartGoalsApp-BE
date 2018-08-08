import { Router } from 'express';

var router = Router();

router.get('/', function (req, res, next) {
	getAll()
		.then(goals => {
			res.json(goals)
		})
		.catch(error => {
			return next(error)
		});
});

router.post('/', function (req, res, next) {
	create(req.body)
		.then(goal => {
			res.json(goal)
		})
		.catch(error => {
			return next(error)
		});
});

export default router;