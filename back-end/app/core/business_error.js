
class BusinessError extends Error {
  constructor(msg, type = BusinessError.TYPE.COMMON) {
    super(msg);
    this.type = type;
  }
}
BusinessError.TYPE = {
  COMMON: '1',
};
module.exports = BusinessError;
