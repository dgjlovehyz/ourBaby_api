'use starict'

const dao = require('../../framework/util/dao');
const userDao = require('../dao/user');
const redisConfig = require('../../config/system-config').redis;
const redis = require('../../framework/util/redis_client').redis(redisConfig);
const _ = require('underscore');

class biz {
    /**
     * 用户关注公众号的时候
     */
    static async userSubscribe(params) {
        console.log('biz')
        return dao.manageTransactionConnection(async (connection) => {
            let result = await userDao.getUser(connection, { FromUserName: params.FromUserName })
            console.log('result', result)
            if (!!result && !!result.openId) {
                //用户已存在
                console.log('update')
                await userDao.updateUser(connection, { FromUserName: params.FromUserName, status: 0 })
            } else {
                //用户不存在
                console.log('insert')
                await userDao.insertUser(connection, params)
            }
            return {
                content: '欢迎关注央晶宝宝公众号，这是一个记录宝宝成长的平台',
                type: 'text'
            }
        })
    }

    /**
     * 取消关注
     * @param {*} params 
     */
    static async userUnsubscribe(params) {
        return dao.manageTransactionConnection(async (connection) => {
            await userDao.updateUser(connection, { FromUserName: params.FromUserName, status: 1 })
            return {
                content: '拜拜',
                type: 'text'
            }
        })
    }

    /**
     * 点击按钮事件，这里会细分每个按钮的功能
     * 
     * @param {*} params 
     */
    static async clickEvent(params) {
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

        if (params.EventKey == 'baby_add') {
            //新增宝宝
            value.biz = './children'
            value.function = 'addName'
            returnMsg.content = '请根据提示添加宝贝信息！请输入宝贝名称:'
            returnMsg.type = 'text'
        } else if (params.EventKey == 'baby_relation') {
            //关联宝宝
            value.biz = './children'
            value.function = 'bindChild'
            returnMsg.content = '请根据提示添加宝贝！请输入宝贝编号:'
            returnMsg.type = 'text'
        } else if (params.EventKey == 'baby_search') {
            //查询

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else if (params.EventKey == '') {

        } else {
            return {
                content: '没有这个操作!',
                type: 'text'
            }
        }

        await redis.set(key, value, 300)
        return returnMsg;
    }

}

module.exports = biz;