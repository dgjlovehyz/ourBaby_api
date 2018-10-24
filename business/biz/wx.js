'use strict'

const wxConfig = require('../../config/system-config').wechat.config;

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
        res.writeHead(200, { 'Content-Type': 'text/plain' })
        if (_signature == params.signature)
            return res.end(params.echostr)
        return res.end('验证失败')
    }
}

module.exports = biz;