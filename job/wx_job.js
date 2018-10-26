const schedule = require('node-schedule');
const wxApi = require('../util/wx_api');
const redisConfig = require('../config/system-config').redis;
const redis = require('../framework/util/redis_client').redis(redisConfig);

function getToken() {
    schedule.scheduleJob('0 0 */2 * * *', async function () {
        try {
            let { access_token } = await wxApi.getWxToken();
            console.log('access_token', access_token)
            redis.set('wxToken', access_token)
        } catch (error) {
            console.error(error)
        }
    })
}



module.exports = function () {
    getToken()
}