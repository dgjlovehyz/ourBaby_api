'use starict'

const dao = require('../../framework/util/dao');
const userDao = require('../dao/user');

class biz {
    /**
     * 用户关注公众号的时候
     */
    static async userSubscribe(params) {

        return dao.manageTransactionConnection(async (connection) => {
            let result = await userDao.getUser(connection, { FromUserName: params.FromUserName })
            if (!!result && !!result.openId) {
                //用户已存在
                await userDao.updateUser(connection, { FromUserName: params.FromUserName, status: 0 })
            } else {
                //用户不存在
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

}

module.exports = biz;