const QueueManger = require('../core/message_queue');

let manager ;
module.exports = {
  get Queue(){
    return manager || (manager = new QueueManger(this))
  }
};
