"use strict";
class Queue {
  constructor(app, name) {
    this.name = name;
    this.redis = app.redis;
  }
  async add(str) {
    this.redis.sadd(this.key, str);
  }
  async getAll() {
    return this.redis.smembers(this.key);
  }
  async popAll() {
    return this.getAll(); // 测试用
   let result = await this.redis.multi().smembers(this.key).del(this.key).exec();
   return result[0][1]; // [[null,[]],[null,[]]]
  }
  get key() {
    return `MessageQueue:${this.name}`;
  }
}

class QueueManager {
  constructor(app) {
    this.cache = {};
    this.app = app;
  }
  get(name) {
    return this.cache[name] || (this.cache[name] = new Queue(this.app, name));
  }
}
module.exports = QueueManager;
