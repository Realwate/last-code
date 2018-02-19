
const redis = require('redis');
bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);

function createClient(options) {
    client = redis.createClient(options);

    if (options.password) {
        client.auth(options.password, function (err) {
            if (err) { throw err; }
        });
    }
    return client;
}

module.exports = createClient
