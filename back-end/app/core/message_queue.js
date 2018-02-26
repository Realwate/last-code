"use strict";
class Queue {
  constructor(app, name) {
    this.name = name;
    this.redis = app.redis;
  }
  async add(str) {
    this.redis.sadd(key, str);
  }
  async getAll() {
    return this.redis.smembers(key);
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
    return this.cache[name] || (this.cache[name] = new MessageQueue(this.app, name));
  }
}
module.exports = QueueManager;
