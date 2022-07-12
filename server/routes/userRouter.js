const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { body } = require('express-validator')

router.get('/auth',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  authMiddleware, UserController.check
)
router.post('/registration',
  UserController.registration
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/', authMiddleware, UserController.getUsers)

module.exports = router;
