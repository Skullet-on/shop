const ApiError = require("../error/ApiError");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.unAuthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unAuthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(ApiError.unAuthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unAuthorizedError());
  }
};
