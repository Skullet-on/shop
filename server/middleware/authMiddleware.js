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

    console.log("accessToken", accessToken);

    const userData = tokenService.validateAccessToken(accessToken);
    console.log("userData", userData);

    if (!userData) {
      return next(ApiError.unAuthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unAuthorizedError());
  }
};
