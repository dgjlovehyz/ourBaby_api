
const redisConfig = require('../config/system-config').redis;
const redis = require('../framework/util/redis_client').redis(redisConfig);


module.exports = redis;