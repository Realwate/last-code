
class BusinessError extends Error {
  constructor(msg, code = BusinessError.ERROR.DEFAULT) {
    super(msg);
    this.code = code;
  }
}
BusinessError.ERROR = {
  RUNTIME:600,  // 系统异常 Error等
  DEFAULT: 500, // 一般的 BusinessError
  LOGIN: 403, // 特殊的 BusinessError
};
module.exports = BusinessError;
