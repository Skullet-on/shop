const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')
const userService = require('../service/user-service')
const{ validationResult } = require('express-validator')

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class UserController {
  async registration(req, res, next) {
    try {
      const { errors } = validationResult(req);

      if (!errors.isEmpty) {
        return next(ApiError.badRequest('Ошибка при валидации', errors))
      }

      const { email, password, role } = req.body
      const userData = await userService.registration(email, password, role);
      
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password);
      
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.logout(refreshToken);

      res.clearCookie('refreshToken');
      
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);

      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    
    return res.json({token})
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();

      return res.json(users)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController()
