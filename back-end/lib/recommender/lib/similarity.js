// 计算两向量的相似度 向量格式如下
// {
//     'Lady in the Water': 2.5,
//     'Snakes on a Plane': 3.5,
// }


let { sum } = require('./util')

// 两向量公共的维度
function getCommonDim(vector1, vector2) {
  return Object.keys(vector1).reduce((accm, key) => {
    if (vector2.hasOwnProperty(key)) {
      accm.push(key)
    }
    return accm;
  }, [])
}
function getAverage(vector) {
  let values = Object.values(vector);
  return sum(values) / values.length;;
}

// 余弦
exports.cosineCoefficient = function (vector1, vector2) {
  // 找到公共的维度
  let commonKeys = getCommonDim(vector1, vector2);
  if (commonKeys.length == 0) {
    return 0;
  }
  let member = 0;
  let v1Sum = 0;
  let v2Sum = 0;
  for (let commonKey of commonKeys) { //
    member += vector1[commonKey] * vector2[commonKey];
    v1Sum += Math.pow(vector1[commonKey], 2);
    v2Sum += Math.pow(vector2[commonKey], 2);
  }
  let denominator = Math.sqrt((v1Sum * v2Sum));
  return member / denominator;
}

// 皮尔森系数
exports.pearsonCoefficient = function (vector1, vector2) {
  // 找到公共的key
  let commonKeys = getCommonDim(vector1, vector2);
  if (commonKeys.length == 0) {
    return 0;
  }
  let avg1 = getAverage(vector1);
  let avg2 = getAverage(vector2);

  // 分母 等于两向量的共有维度各自减去均值 再取模 相乘
  let denominator;
  // 分子 等于两向量的共有维度各自减去均值  再点积
  let member = 0;
  let v1Sum = 0;
  let v2Sum = 0;
  for (let commonKey of commonKeys) { //
    let v1Score = vector1[commonKey] - avg1;
    let v2Score = vector2[commonKey] - avg2;
    member += v1Score * v2Score;
    v1Sum += Math.pow(v1Score, 2);
    v2Sum += Math.pow(v2Score, 2);
  }
  denominator = Math.sqrt(v1Sum * v2Sum)
  return member / denominator;
}

// 修正余弦
exports.adjustedCosineCoefficient = function (vector1, vector2) {
  // 找到公共的key
  let commonKeys = getCommonDim(vector1, vector2);
  if (commonKeys.length == 0) {
    return 0;
  }
  let avg1 = getAverage(vector1);
  let avg2 = getAverage(vector2);
  // 分母 等于向量自身的维度(pearson是共有的维度) 各自减去均值 再取模 相乘
  let denominator;
  // 分子 等于两向量的共有维度各自减去均值  再点积
  let member = 0;
  for (let commonKey of commonKeys) {
    let v1Score = vector1[commonKey] - avg1;
    let v2Score = vector2[commonKey] - avg2;
    member += v1Score * v2Score;
  }
  let v1Sum = Object.values(vector1).reduce((sum, value) => sum += Math.pow(value - avg1, 2), 0)
  let v2Sum = Object.values(vector2).reduce((sum, value) => sum += Math.pow(value - avg2, 2), 0)

  denominator = Math.sqrt(v1Sum * v2Sum)
  return member / denominator;
}
/* istanbul ignore if  */
exports.findSimilarityAlgorithm = (name) => {
  var mapping = {
    pearson: exports.pearsonCoefficient,
    cosine: exports.cosineCoefficient,
    adjCosine: exports.adjustedCosineCoefficient
  }
  return mapping[name];
}
