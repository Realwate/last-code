
const USER = 'user';
const ITEM = 'item';
function format(type, id, name) {
  return `${type}:${id}:${name}`;
}
class Key {
    userVectorKey(userId) { // user对应的向量
        return format(USER, userId, 'userVector');
    }
    itemVectorKey(itemId) { // item对应的向量
        return format(ITEM, itemId, 'itemVector');
    }

    recommendedZSet(userId) {// 推荐的item
        return format(USER, userId, 'recommendedZSet');
    }

    similarityZSet(userId) { // 相似的user
        return format(USER, userId, 'similarityZSet');
    }

    randomKey() {
        return "random:" + Date.now();
    }
}

module.exports = new Key();
