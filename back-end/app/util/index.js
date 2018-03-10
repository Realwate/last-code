const BusinessError = require('../core/business_error');
const uuidv1 = require('uuid/v1');

const utils = {
  throwError(...args) {
    throw new BusinessError(...args);
  },
  uuidv1() {
    return uuidv1().split('-').join('');
  },
};
module.exports = utils;
