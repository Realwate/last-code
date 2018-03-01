const QueueManger = require('../core/message_queue');
const util = require('../util');

let manager ;
module.exports = {
  get Queue(){
    return manager || (manager = new QueueManger(this))
  },
  util
};
