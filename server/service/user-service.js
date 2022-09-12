const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password, role) {
    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.badRequest("Пользователь с таким email уже существует");
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      throw ApiError.internal("Неверный логин, или пароль");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unAuthorizedError();
    }

    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.unAuthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await User.findAll();

    return users;
  }
}

module.exports = new UserService();
