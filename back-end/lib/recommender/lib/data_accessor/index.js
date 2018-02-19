
const RedisDataAccesor = require('./redis_data_accessor')
const LocalDataAccesor = require('./local_data_accessor')

module.exports = function findDataAccessor(config){
  if(config['redis']){
    return new RedisDataAccesor(config['redis'])
  }
  return new LocalDataAccesor(config);// 本地
}
