const Router = require('express');
const router = new Router();
const TypeController = require('../controllers/typeController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', TypeController.getAll);

router.post('/', authMiddleware, TypeController.create);

module.exports = router;
