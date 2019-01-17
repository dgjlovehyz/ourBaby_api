const https = require('https');
const request = require('request');
const { api, config } = require('../config/system-config').wechat;
const redis = require('./redis');
const Exception = require('../framework/exception/exception');
const _ = require('underscore');


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
                if (!!body.errcode && body.errcode != 0) reject(body)
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
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                return resolve(body)
            })
        })
    }
    /**
     * 目前来说只支持图片链接转成永久素材
     * @param {*} params 
     */
    static async addMaterial(params) {
        let reqInfo = {
            url: api.addMaterial.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            formData: {
                media: {
                    value: undefined,
                    options: {
                        filename: '2.png',
                        contentType: 'image/png'
                    }
                },
            }
        }
        return new Promise((resolve, reject) => {
            request.get(params.imgPath).on('response', async (response) => {
                reqInfo.formData.media.value = response
                request(reqInfo, (err, resp, body) => {
                    if (err) reject(err)
                    if (!!body.errcode && body.errcode != 0) reject(body)
                    if (_.isString(body))
                    body = JSON.parse(body)
                    return resolve(body)
                })
            })
        })
    }

    static async uploadImg(params) {

        request(params.img).pipe()
        let reqInfo = {
            url: api.uploadImg.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            from: {

            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                return resolve(body)
            })
        })
    }

    static async addUserTag(params) {
        let reqInfo = {
            url: api.addUserTag.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                tag: { name: params.tagName }
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                resolve(body)
            })
        })
    }

    static async userAddTag(params) {
        let reqInfo = {
            url: api.userAddTag.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                openid_list: [params.openId],
                tagid: params.tagId
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                resolve(body)
            })
        })
    }

    static async getUserTag(params) {
        let reqInfo = {
            url: api.getUserTag.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                openid: params.openId
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                resolve(body)
            })
        })
    }

    static async cancelUserTag(params) {
        let reqInfo = {
            url: api.cancelUserTag.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                openid_list: [params.openId],
                tagid: params.tagId
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                resolve(body)
            })
        })
    }

    static async menuDelete(params) {
        let reqInfo = {
            url: api.menuDelete.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'GET',
            json: true,
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                resolve(body)
            })
        })
    }

    /**
     * 删除个性化菜单
     * @param {*} params 
     */
    static async conditionalMenuDelete(params) {
        let reqInfo = {
            url: api.conditionalMenuDelete.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                menuid: params.menuId
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                resolve(body)
            })
        })
    }

    /**
     * 创建个性化菜单
     * @param {*} params 菜单json结构
     */
    static async conditionalMenuCreate(params) {
        let reqInfo = {
            url: api.conditionalMenuCreate.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: params
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                resolve(body)
            })
        })
    }

    /**
     * 新增永久图文素材
     * @param {*} params 
     */
    static async addNews(params) {
        let reqInfo = {
            url: api.addNews.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                articles: []
            }
        }
        
        reqInfo.body.articles.push(params.diary)
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                resolve(body)
            })
        })
    }

    static async updateNews(params) {
        let reqInfo = {
            url: api.updateNews.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                media_id: params.mediaId,
                index: params.index || 0,
                articles: params.diary
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                resolve(body)
            })
        })
    }

    static async getNews(params) {
        let reqInfo = {
            url: api.getNews.replace('{0}', await wxApi.getWxTokenByRedis()),
            method: 'POST',
            json: true,
            body: {
                media_id: params.mediaId
            }
        }
        return new Promise((resolve, reject) => {
            request(reqInfo, async (err, res, body) => {
                if (err) reject(err)
                if (!!body.errcode && body.errcode != 0) reject(body)
                if (_.isString(body))
                    body = JSON.parse(body)
                resolve(body)
            })
        })
    }

    /**
     * 获取微信token
     */
    static async getWxTokenByRedis() {
        let token = await redis.get('wxToken')
        if (!token)
            return Exception.BusinessException('获取微信token失败')
        return token
    }
}

module.exports = wxApi;