const createAccessor = require('./data_accessor')
const util = require('./util')
const {findSimilarityAlgorithm} = require('./similarity')

const defaultConfig = {
  recommend:{ // 推荐数量
    count:10
  },
  similarity:{// 相似用户的数量
    count:6
  },
  similarityAlgorithm: 'pearson',
  dataAccesor: {
    redis:{
      host:"localhost",
      port:6379
    }
  }
}
class Recommender {
  constructor(options) {
    options = Object.assign({},defaultConfig,options);
    this.logger = {
      log:()=>{
        if(this.enableLog()){
          return console.log.bind(console);
        }
      }
    };
    this.recommendOptions = options.recommend;
    this.similarityOptions = options.similarity;
    this.dataAccessor = createAccessor(options.dataAccesor);
    this.calcSimilarity = findSimilarityAlgorithm(options.similarityAlgorithm);
  }
  enableLog(){
    return false;
  }
  setLogger(logger){
    this.logger = logger;
    this.dataAccessor.setLogger(logger);
  }
  // 需要处理记录过多 刷新过多的情况 -- 记录时间
  async refreshRecommendations(userId){ // 刷新
    await this.updateSimilarity(userId);
    await this.updateRecommendations(userId);
  }
  async updateRecommendations(userId) {
    let result = await Promise.all([
      this.dataAccessor.getRecommendedItems(userId,{count:0}),// 已经推荐过的items 没有则返回null
      this.getSimilarUsersFromCache(userId, {includeScore:true})
    ]);
    if(result[1] == null){ // 没有behavior 找不到相似用户
      return;
    }
    let curUserItemSet = new Set(result[0]); // 用于做差集 得到notRatedItems
    // let recommendtItemSet = new Set(); // 其他用户喜欢的item并集

    // result[1]格式[name1,score1,name2,score2,...]
    let similarUserIds = result[1].filter((item,i) => i % 2 == 0); // 相似用户的id
    let similarUserSimilarity = result[1].filter((item,i) => i % 2 != 0).map((strNum)=>parseFloat(strNum)); // 相似用户的相似度
    let similarUserVectors = await this.getUserVecotr(similarUserIds); // 相似用户的vector
    let itemScoreResult = {}; // 保存评分结果 {item1:[89,0.8],item2:43}

    // 遍历所有相似user的向量 给出item评分
    for (let i = 0; i < similarUserVectors.length; i++) {
      let userVector = similarUserVectors[i]
      let similarUserId = similarUserIds[i]
      let similarity = similarUserSimilarity[i]

      for (let item of Object.keys(userVector)) {
        let itemScore = userVector[item]; // 对应user对item的评分
        // recommendtItemSet.add(item);
        if (curUserItemSet.has(item)) {
          // continue; // 差集
        }
        if (itemScoreResult[item] == null) {
          itemScoreResult[item] = [0, 0]; // 分数，用户相似度
        }
        itemScoreResult[item][0] += itemScore * similarity; // item分数 等于评分乘相似度
        itemScoreResult[item][1] += 1; // 直接取平均
        // itemScoreResult[item][1] += similarity; // 保存相似度和 用于修正分数
        // 考虑同样的分数 0.1 与 0.9相似度的用户最终评分是一样的 不科学
      }
    }
    let finalResult = []; // [score,name]
    for (let itemId of Object.keys(itemScoreResult)) {
      let finalScore = itemScoreResult[itemId][0] / itemScoreResult[itemId][1]; // 用于修正 有很多相似度低的人评分
      finalResult.push(finalScore, itemId);
    }
    this.logger.log(`更新推荐 ${userId} `,finalResult)
    return this.saveItemScore(userId, finalResult);
  }
  async updateSimilarity(userId) {
    // 获取user所有item
    let curUserVector = await this.getUserVecotr(userId);
    if(curUserVector == null){ // 没有item
      return;
    }
    let itemKeys = Object.keys(curUserVector);
    // 所有曾经对item评分的人
    let ratedSameItemUserSet = new Set();
    let itemVectors = await this.getItemVector(itemKeys)
    for (let itemVector of itemVectors) {
      for (let ratedUserId of Object.keys(itemVector))
        ratedSameItemUserSet.add(ratedUserId)
    }
    ratedSameItemUserSet.delete(userId); // 去掉自己
    if(ratedSameItemUserSet.size == 0){ // 没有相似的user
      return;
    }
    let ratedSameItemUsers = Array.from(ratedSameItemUserSet);
    let userVectors = await this.getUserVecotr(ratedSameItemUsers);
    let result = [];
    for (let i = 0; i < ratedSameItemUsers.length; i++) {
      let similarity = this.calcSimilarity(curUserVector, userVectors[i]);// 计算相似度
      result.push(similarity, ratedSameItemUsers[i]) // [score,name]
    }
    this.logger.log(`更新相似度 ${userId} `,result)
    return this.saveSimilarityResult(userId, result); // 保存结果
  }
  mergeSimilarityOptions(options){
    return Object.assign({},this.similarityOptions,options);
  }
  mergeRecommendOptions(options){
    return Object.assign({},this.recommendOptions,options);
  }
  async getSimilarUsersFromCache(userId,options={}) { // 获取相似的user
    options = this.mergeSimilarityOptions(options);
    let users = await this.dataAccessor.getSimilarUsers(userId,options);// 内部调用的options一定有值
    // if (users == null) {
    //   this.logger.log(`${userId} 相似user为0`)
    //   return this.updateSimilarity(userId)
    //     .then(() => this.dataAccessor.getSimilarUsers(userId,options));
    // }
    return users;
  }
  async getRecommendedItemsFromCache(userId,options={}) {// 获取推荐的item
    options = this.mergeRecommendOptions(options);
    let items = await this.dataAccessor.getRecommendedItems(userId,options);
    // if (items == null) {
    //   this.logger.log(`${userId} 推荐item为0`)
    //   return this.updateRecommendations(userId)
    //     .then(() => this.dataAccessor.getRecommendedItems(userId,options));
    // }
    return items;
  }
}

//  dataAccesor5个公共接口 包装到Recommender 方便调用
(function delegateMethod(target) {
  'loadDataSet,saveItemScore,saveSimilarityResult,getUserVecotr,getItemVector'
    .split(',')
    .forEach((method) => {
      target[method] = function(...args){
        return this.dataAccessor[method](...args);
      }
    })
})(Recommender.prototype)


module.exports = Recommender;
