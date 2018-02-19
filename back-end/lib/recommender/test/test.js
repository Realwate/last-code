'use strict';
const assert = require('assert');
const dataset = require('./dataset')
const { cosineCoefficient, pearsonCoefficient, adjustedCosineCoefficient } = require('../lib/similarity')
const Recommender = require('../lib/recommender')
const log = console.log.bind(console);

const alpha = 0.000001;
function equal(a,b){
  return a-b <alpha;
}

describe('similarity', function () {
  let v1 = {a:4.5,b:1,c:4,d:3.5,e:4.5}
  let v2 = {a:3.5,b:2.5,c:3.5,d:2,e:3}
  it('pearson', function () {
    assert(equal(pearsonCoefficient(v1, v2) ,0.52613364176466 ))
   })
  it('cosine', function () {
    // log(cosineCoefficient(v1, v2))
    assert(equal(cosineCoefficient(v1, v2) ,0.9549075548449972 ))
  })
  it('adjcosine', function () {
    // log(adjustedCosineCoefficient(v1, v2))
    assert(equal(adjustedCosineCoefficient(v1, v2) ,0.5261336417646564 ))
  })
})

describe('recommend', function () {
  let rec;
  let user = 'Lisa Rose';
  let users = null;
  let items = null;
  describe('use redis dataAccesor',function(){
    before(async () => {
      rec = new Recommender();
      await (rec.loadDataSet(dataset));
      await (rec.updateSimilarity(user));
      return (rec.updateRecommendations(user));
    })
    it('should return similar users', async () => {
      users = await rec.getSimilarUsersFromCache(user)
      // log('similar users ', users)
    })
    it('should return recommend items', async () => {
      items = await rec.getRecommendedItemsFromCache(user)
      // log('recommended items ', items)
    })
  });
  describe('use local dataAccesor',function(){
    before(async () => {
      rec = new Recommender({dataAccesor:{}});
      await (rec.loadDataSet(dataset));
      await (rec.updateSimilarity(user));
      return (rec.updateRecommendations(user));
    })

    it('should return similar users', async () => {
      let u = await rec.getSimilarUsersFromCache(user)
      assert.deepEqual(u,users)
      // log('similar users ', users)
    })
    it('should return recommend items', async () => {
      let i = await rec.getRecommendedItemsFromCache(user)
      assert.deepEqual(items,i)
      // log('recommended items ', items)
    })
  })

})
