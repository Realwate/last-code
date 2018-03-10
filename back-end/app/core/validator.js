function isNull(val) {
  return val == null;
}
function isString(val) {
  return typeof val === 'string';
}

class Validator {
  require(msg) {
    return value => {
      if (isNull(value)) {
        return msg;
      }
      if (isString(value) && value.trim() == '') {
        return msg;
      }
    }
  }
  match(msg, pattern) {
    return (value) => {
      if (!isString(value) || !pattern.test(value)) {
        return msg;
      }
    };
  }
  custom(msg, fn) {
    return async (value, data) => {
      if (!await fn(value, data)) {
        return msg;
      }
    };
  };
  async validate(rule, data) {
    let errorMsg;
    for (let prop of Object.keys(rule)) {
      // 校验data的一个属性
      let validators = rule[prop];

      for (let validator of validators) {
        // validator负责校验并返回错误信息
        errorMsg = await validator(data[prop], data); // validator接受 value ,o
        if (errorMsg) {
          return errorMsg;
        }
      }
    }
  }
}


module.exports = new Validator();
