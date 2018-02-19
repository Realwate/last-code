const util = require('../util')
class LocalDataAccessor {
  constructor() {
    this.cache = {
      recommendedItems: {}, // userid:[{item,score}]
      similarUsers: {}, // userid:[{similarity,user}]
    };
    this.dataset = null;
  }
  setLogger(logger){
    this.logger = logger;
  }
  async loadDataSet(dataset) { // dataset 为 user-item 格式
    this.dataset = dataset;
    this.reversedDataset = util.flipMatrix(dataset);
  }

  async saveItemScore(userId, result) { // [score,item]
    let storage = this.cache['recommendedItems'][userId] = []
    for (let i = 0; i < result.length; i += 2) { // 格式转换
      storage.push({
        score: result[i],
        item: result[i + 1],
      })
    }
    storage.sort((a, b) => a.score < b.score)
  }
  async saveSimilarityResult(userId, result) { // [similarity,user]
    let storage = this.cache['similarUsers'][userId] = []
    for (let i = 0; i < result.length; i += 2) { // 格式转换
      storage.push({
        similarity: result[i],
        user: result[i + 1],
      })
    }
    storage.sort((a, b) => a.similarity < b.similarity)
  }
  async getSimilarUsers(userId, options) {
    let all = this.cache['similarUsers'][userId];
    if (all == null || all.length == 0) {
      return null;
    }
    let realCount = Math.min(all.length, options.count);
    let result = []; // 格式 [user,similarity]
    if (options.includeScore) {
      realCount *= 2;
      for (let item of all) {
        result.push(item.user, item.similarity);
      }
    } else {
      result = all.map((item) => item['user'])
    }
    return result.slice(0, realCount);
  }

  async getRecommendedItems(userId, options) { //  [item,score]
    let all = this.cache['recommendedItems'][userId];
    if (all == null || all.length == 0) {
      return null;
    }
    let realCount = Math.min(all.length, options.count);
    let result = []; // 格式 [user,similarity]
    if (options.includeScore) { // 包含分数
      realCount *= 2;
      for (let el of all) {
        result.push(el.item, el.score);
      }
    } else {
      result = all.map((el) => el['item']) // 默认返回user
    }
    return result.slice(0, realCount); // 左闭右开
  }
  async getUserVecotr(userId) { // 得到对应user的多维向量
    if (util.isArray(userId)) {
      let userIds = userId;
      return userIds.map((id) => this.dataset[id])
    }
    return this.dataset[userId];
  }
  async getItemVector(itemId) { // 得到对应item的多维向量
    if (util.isArray(itemId)) {
      let itemIds = itemId;
      var self = this;
      return itemIds.map((id) => self.reversedDataset[id])
    }
    return this.reversedDataset[itemId];
  }
}

module.exports = LocalDataAccessor;
