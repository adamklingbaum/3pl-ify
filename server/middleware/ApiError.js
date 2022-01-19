// Methodology adapted from https://github.com/productioncoder/express-error-handling

class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static notFound(msg) {
    return new ApiError(404, msg);
  }

  static internal() {
    return new ApiError(500, 'internal server error');
  }
}

module.exports = ApiError;
