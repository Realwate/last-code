
exports.sum = function(arr){
    return arr.reduce((accm,item)=>accm+item)
}
exports.isArray = function(o){
  return o instanceof Array;
}
// user-item 变化为 item-user
exports.flipMatrix = function(dataset) {
  var result = {};

  for(let userKey in dataset){
    for(let itemKey in dataset[userKey]){
      var score = dataset[userKey][itemKey];
      if(result[itemKey] == null){
        result[itemKey] = {};
      }
      result[itemKey][userKey] = score;
    }
  }

	return result;
};
