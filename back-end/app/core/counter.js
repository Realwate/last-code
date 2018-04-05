"use strict";
class Counter {
  constructor(app) {
    this.redis = app.redis;
  }
  async incr(name) {
    return this.redis.incr(this.key(name));
  }
  async incrby(name, num) {
    return this.redis.incrby(this.key(name), num);
  }
  async reset(name) {
    return this.redis.del(this.key(name));
  }
  async get(name) {
    return this.redis.get(this.key(name));
  }
  key(key) {
    return `counter:${key}`;
  }
}

module.exports = Counter;
