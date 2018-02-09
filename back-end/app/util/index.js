const BusinessError = require('../core/business_error');
const uuidv1 = require('uuid/v1');

const utils = {
  throwError(msg) {
    throw new BusinessError(msg);
  },
  uuidv1() {
    return uuidv1().split('-').join('');
  },
};
module.exports = utils;
