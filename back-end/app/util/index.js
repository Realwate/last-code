const BusinessError = require('../core/business_error');
const uuidv1 = require('uuid/v1');
const fs = require('fs');
const path = require('path');

const utils = {
  throwError(...args) {
    throw new BusinessError(...args);
  },
  uuidv1() {
    return uuidv1().split('-').join('');
  },
  getDatePath() {
    let d = new Date();
    return `${d.getFullYear()}/${d.d.getMonth() + 1}/${d.getDate()}`
  },
  awaitWrite(stream) {
    return new Promise((resolve, reject) => {
      function success() {
        clean();
        resolve()
      }
      function fail(e) {
        clean();
        reject(e)
      }
      function clean() {
        stream.removeListener('finish', success);
        stream.removeListener('error', fail);
      }
      stream.on('finish', success);
      stream.on('error', fail);
    })
  },
  mkDir(targetDir) {
    const sep = path.sep;
    targetDir.split(sep).reduce((parentDir, childDir) => {
      let curDir = path.join(parentDir, childDir);
      if(fs.existsSync(curDir)){
        return curDir;
      }
      fs.mkdirSync(curDir);
      return curDir;
    });
  }
};
module.exports = utils;
