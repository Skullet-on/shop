const jwt = require("jsonwebtoken");
const { Token } = require("../models");

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "30d" }
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);

      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    try {
      const tokenData = await Token.findOne({ where: { userId: userId } });

      if (tokenData) {
        tokenData.refreshToken = refreshToken;

        const token = await tokenData.save();

        return token;
      }

      const token = await Token.create({ userId: userId, refreshToken });

      return token;
    } catch (error) {
      return null;
    }
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({
      where: { refreshToken: refreshToken },
    });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({
      where: { refreshToken: refreshToken },
    });

    return tokenData;
  }
}

module.exports = new TokenService();
