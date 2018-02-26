
const createClient = require('./redis_client')
const util = require('../util')
const {
  userVectorKey,
  itemVectorKey,
  recommendedZSet,
  similarityZSet
} = require('./redis_key')

class RedisDataAccessor {
  constructor(options) {
    this.redis = createClient(options);
    this.logger = console;
    this.redis.on('error', function (err) {
      this.logger.error(err);
    })
  }
  setLogger(logger) {
    this.logger = logger;
  }
  dataset2Vectors(dataset, keyFn, getFn) { // dataset 转为向量 [key1,json1,key2,json2]
    // 先获取旧的
    let keys = Object.keys(dataset);
    let oldVectors = getFn(keys);
    for (let i = 0; i < keys.length; i++) {
      let oldVector = oldVectors[i];
      let newVector = dataset[i];
      for (let vectorKey of Object.keys(newVector)) {
        if (newVector[vectorKey] == 0) {
          oldVector[vectorKey] = undefined;
          continue;
        }
        oldVector[vectorKey] += newVector[vectorKey];
      }
      dataset[i] = oldVector; // 覆盖
    }
    // 返回
    return keys.reduce((arr, key) => {
      arr.push(keyFn(key), JSON.stringify(dataset[key]))
      return arr;
    }, [])
  }

  async loadDataSet(dataset) { // dataset 为 user-item 格式
    let reversedDataset = util.flipMatrix(dataset);
    let userKeyValues = this.dataset2Vectors(dataset, userVectorKey, this.getUserVecotr);   // 内部会获取旧的做patch更新
    let itemKeyValues = this.dataset2Vectors(reversedDataset, itemVectorKey, this.getItemVecotr);
    return this.redis.msetAsync(userKeyValues.concat(itemKeyValues)); // 总是覆盖
  }

  async saveItemScore(userId, result) {
    return this.redis.delAsync(recommendedZSet(userId))
      .then(() => client.zaddAsync(recommendedZSet(userId), result))
  }
  async saveSimilarityResult(userId, result) {
    return this.redis.delAsync(similarityZSet(userId))
      .then(() => this.redis.zaddAsync(similarityZSet(userId), result))
  }
  async getSimilarUsers(userId, options) { // 返回最相似的count个user
    let args = options.includeScore ? 'WITHSCORES' : null; // 返回分数
    let all = await this.redis.zcardAsync(similarityZSet(userId))
    if (all == 0) {
      return null;
    }
    let realCount = Math.min(all, options.count) - 1;
    if (args) {
      return this.redis.zrevrangeAsync(similarityZSet(userId), 0, realCount, args);
    }
    return this.redis.zrevrangeAsync(similarityZSet(userId), 0, realCount); // // 闭区间

  }

  async getRecommendedItems(userId, options) {
    let all = await this.redis.zcardAsync(recommendedZSet(userId))
    if (all == 0) {
      return null;
    }
    let realCount = Math.min(all, options.count) - 1;

    return client.zrevrangeAsync(recommendedZSet(userId), 0, realCount) // 闭区间
  }
  async getUserVecotr(userId) { // 得到对应user的多维向量
    if (util.isArray(userId)) {
      return this.getMultiVector(userId, userVectorKey);
    }
    return this.getVector(userId, userVectorKey);
  }
  async getItemVector(itemId) { // 得到对应item的多维向量
    if (util.isArray(itemId)) {
      return this.getMultiVector(itemId, itemVectorKey);
    }
    return this.getVector(itemId, itemVectorKey);
  }
  async getVector(id, keyFn) {
    return this.redis.getAsync(keyFn(id))
      .then(res => JSON.parse(res));
  }
  async getMultiVector(ids, keyFn) {
    return this.redis.mgetAsync(ids.map(id => keyFn(id)))
      .then((arr) => arr.map((strVector) => JSON.parse(strVector)))
  }
}

module.exports = RedisDataAccessor;
