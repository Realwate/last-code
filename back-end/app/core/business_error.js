
class BusinessError extends Error {
  constructor(msg, code = BusinessError.ERROR.DEFAULT) {
    super(msg);
    this.code = code;
  }
}
BusinessError.ERROR = {
  RUNTIME:500,
  DEFAULT: 1,
  LOGIN: 403,
};
module.exports = BusinessError;
