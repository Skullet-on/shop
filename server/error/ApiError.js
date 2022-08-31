class ApiError extends Error {
  constructor(status, message, errors) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static badRequest(status = 400, message, errors = []) {
    return new ApiError(status, message, errors);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }

  static unAuthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }
}

module.exports = ApiError;
