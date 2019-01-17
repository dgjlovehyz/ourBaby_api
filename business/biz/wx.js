'use strict'

const wxConfig = require('../../config/system-config').wechat.config;
const crypto = require('crypto');
const redisConfig = require('../../config/system-config').redis;
const redis = require('../../framework/util/redis_client').redis(redisConfig);
const _ = require('underscore');

class biz {
    /**
     * wx接通验证
     * 
     * @param {*} params 
     */
    static async wxAuto(params) {
        //微信公众号接通
        let dict = { token: wxConfig.token, timestamp: params.timestamp, nonce: params.nonce };
        var sha1Str = '';
        for (let key of Object.values(dict).sort()) {
            console.log('key：' + key)
            sha1Str = sha1Str + key
        }
        var sha1 = crypto.createHash("sha1");
        sha1.update(sha1Str)
        console.log("sha1Str:" + sha1Str)
        console.log("timestamp:" + params.timestamp)
        console.log("nonce:" + params.nonce)
        var _signature = sha1.digest('hex')
        console.log("signature:" + params.signature)
        console.log("_signature:" + _signature)
        console.log("echostr:" + params.echostr)

        if (_signature == params.signature)
            return params.echostr
        return '验证失败'
    }

    /**
     *  处理来自普通消息的内容
     * 
     * @param {*} params 
     */
    static async textHandle(params) {

        let key = 'openid:' + params.FromUserName,
            value = await redis.get(key),
            returnMsg = {
                content: '',
                type: ''
            }
        if (_.isString(value))
            value = JSON.parse(value)
        if (!value) {
            value = { openId: params.FromUserName }
        }
        value.content = params.Content
        if (!!value.biz && !!value.function) {
            console.log('redis:', value)
            let ret = await require(value.biz)[value.function](value)
            redis.set(key, ret, 300)
            if (_.isArray(ret.msg)) {
                returnMsg = ret.msg
            } else if (_.isString(ret.msg)) {
                returnMsg.content = ret.msg
                returnMsg.type = ret.type || 'text'
            }
        } else {
            returnMsg.content = '不知道你想要什么╮(╯▽╰)╭'
            returnMsg.type = 'text'
        }

        return returnMsg
    }

    static async imgHandle(params) {
        let key = 'openid:' + params.FromUserName,
            value = await redis.get(key),
            returnMsg = {
                content: '',
                type: ''
            }
        if (_.isString(value))
            value = JSON.parse(value)
        if (!value) {
            value = { openId: params.FromUserName }
        }
        value.imgPath = params.PicUrl
        value.mediaId = params.MediaId
        if (!!value.biz && !!value.function) {
            console.log('redis:', value)
            let ret = await require(value.biz)[value.function](value)
            redis.set(key, ret, 300)
            if (_.isArray(ret.msg)) {
                returnMsg = ret.msg
            } else if (_.isString(ret.msg)) {
                returnMsg.content = ret.msg
                returnMsg.type = ret.type || 'text'
            }
        } else {
            returnMsg.content = '不知道你想要什么╮(╯▽╰)╭'
            returnMsg.type = 'text'
        }
        return returnMsg
    }

}

module.exports = biz;