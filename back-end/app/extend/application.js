const QueueManger = require('../core/message_queue');
const Counter = require('../core/counter');
const util = require('../util');

let manager ;
let counter ;
module.exports = {
  get Queue(){
    return manager || (manager = new QueueManger(this))
  },
  get Counter(){
    return counter || (counter = new Counter(this))
  },
  util
};
