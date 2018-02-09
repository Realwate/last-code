const validator = {};

function isNull(val) {
  return val == null;
}
function isString(val) {
  return typeof val === 'string';
}
validator.require = msg => {
  return value => {
    if (isNull(value)) {
      return msg;
    }
    if (isString(value) && value.trim() == '') {
      return msg;
    }
  };
};
validator.match = (msg, pattern) => {
  return value => {
    if (!isString(value) || !pattern.test(value)) {
      return msg;
    }
  };
};
validator.custom = (msg, fn) => {
  return async value => {
    if (!await fn(value)) {
      return msg;
    }
  };
};

validator.validate = async(validators, value) => {
  let errorMsg;
  for(let validator of validators){
     // validator负责校验并返回错误信息 
    errorMsg = await validator(value);
    if(errorMsg){
      return errorMsg;
    }
  }
}

module.exports = validator;
