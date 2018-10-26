const https = require('https');
const request = require('request');
const { api, config } = require('../config/system-config').wechat;
const redis = require('./redis');
const Exception = require('../framework/exception/exception')


class wxApi {

    static async getWxToken() {
        let reqInfo = {
            url: api.getWxToken.replace('{0}', config.appid).replace('{1}', config.AppSecret),
            method: "GET",
            json: true
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode) reject(body)
                return resolve(body);
            })
        })
    }

    static async menuCreate(params) {
        let reqInfo = {
            url: api.menuCreate.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: params
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (body.errcode != 0) reject(body)
                return resolve(body)
            })
        })
    }

    static async getWxTokenByRedis() {
        let token = await redis.get('wxToken')
        if (!token)
            return Exception.BusinessException('获取微信token失败')
        return token
    }
}

module.exports = wxApi;