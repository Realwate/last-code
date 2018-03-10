const BusinessError = require('./business_error');

class JSONResult {
  static error(err) {
    if (!(err instanceof Error)) {
      err = new Error(err);
    }
    let error = {
      code: err.code || BusinessError.ERROR.RUNTIME,
      message: err.message,
      stack: err.stack,
    }

    return {
      success: false,
      error
    };
  }
  static success(data) {
    return {
      success: true,
      data,
    };
  }
  static wrap(err, data, ctx) {
    ctx.body = err ? JSONResult.error(err) : JSONResult.success(data);
    ctx.status = 200;
  }
}

module.exports = JSONResult;
