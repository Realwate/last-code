'use strict';
const assert = require('assert');
const dataset = require('./dataset')
const { cosineCoefficient, pearsonCoefficient, adjustedCosineCoefficient } = require('../lib/similarity')
const Recommender = require('../lib/recommender')
const log = console.log.bind(console);

function equal(a, b) {
  return a - b < Number.EPSILON;
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
  let similarUsers = null;
  let recomendedItems = null;
  describe.only('use local dataAccesor',function(){
    before(async () => {
      rec = new Recommender({similarityAlgorithm: 'adjCosine',dataAccesor:{}});
      // rec = new Recommender({similarityAlgorithm: 'pearson',dataAccesor:{}});
      await (rec.loadDataSet(dataset));
      await (rec.updateSimilarity(user));
      return (rec.updateRecommendations(user));
    })

    it('should return similar users', async () => {
      similarUsers = await rec.getSimilarUsersFromCache(user,{includeScore:true})
      log('similar users ', similarUsers)
    })
    it('should return recommend items', async () => {
      recomendedItems = await rec.getRecommendedItemsFromCache(user,{includeScore:true})
      // assert.deepEqual(items,i)
      log('recommended items ', recomendedItems)
    })
  })

  describe('use redis dataAccesor',function(){
    before(async () => {
      rec = new Recommender();
      await (rec.loadDataSet(dataset));
      await (rec.updateSimilarity(user));
      return (rec.updateRecommendations(user));
    })
    it('should return similar users', async () => {
      res = await rec.getSimilarUsersFromCache(user,{includeScore:true})
      assert.deepEqual(res,similarUsers)
      // log('similar users ', users)
    })
    it('should return recommended items', async () => {
      res = await rec.getRecommendedItemsFromCache(user,{includeScore:true})
      assert.deepEqual(res,recomendedItems)
      // log('recommended items ', items)
    })
  });
})
