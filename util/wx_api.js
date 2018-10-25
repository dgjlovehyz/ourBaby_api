const https = require('https');
const request = require('request');
const { api, config } = require('../config/system-config').wechat;


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

}

module.exports = wxApi;