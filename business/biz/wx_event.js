'use starict'

const dao = require('../../framework/util/dao');
const redisConfig = require('../../config/system-config').redis;
const redis = require('../../framework/util/redis_client').redis(redisConfig);
const userDao = require('../dao/user');
const children = require('./children');
const _ = require('underscore');

class biz {
    /**
     * 用户关注公众号的时候
     */
    static async userSubscribe(params) {
        console.log('biz')
        return dao.manageTransactionConnection(async (connection) => {
            let result = await userDao.getUser(connection, { openId: params.FromUserName })
            console.log('result', result)
            if (!!result && !!result.openId) {
                //用户已存在
                console.log('update')
                await userDao.updateUser(connection, { openId: params.FromUserName, status: 0 })
            } else {
                //用户不存在
                console.log('insert')
                params.openId = params.FromUserName
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
        if (_.isString(value) && value.length > 0)
            value = JSON.parse(value)
        if (!value) {
            value = { openId: params.FromUserName }
        }

        switch (params.EventKey) {
            case 'baby_add':
                //新增宝宝
                value.biz = './children'
                value.function = 'addName'
                returnMsg.content = '请根据提示添加宝贝信息！请输入宝贝名称:'
                returnMsg.type = 'text'
                break;
            case 'baby_search':
                //查询
                let retMsg = await children.searchChildren({ openId: params.FromUserName });
                value.biz = retMsg.biz
                value.function = retMsg.function
                value.data = retMsg.data
                returnMsg.content = retMsg.msg
                returnMsg.type = retMsg.type
                break;
            case 'baby_relation':
                value.biz = './children'
                value.function = 'bindChild'
                returnMsg.content = '请根据提示添加宝贝！请输入宝贝编号:'
                returnMsg.type = 'text'
                break;
            case 'baby_empty':
                return {
                    content: '还没有绑定宝贝哦，赶快创建或关联一个宝贝吧!',
                    type: 'text'
                }
                break;
            case 'help_baby_uuid':
                return {
                    content: '在查询宝贝里可以查询某个宝贝的编号，发送给好友可以就可以关联宝贝了哦',
                    type: 'text'
                }
                break;
            case 'help_day_explain':
                return {
                    content: '每日状态，只有某一个宝贝关联者上传了今日状态以后才会有哦！',
                    type: 'text'
                }
                break;
            case 'V1001_GOOD':
                return {
                    content: '感谢你的支持，其实这个按钮没什么用！[Smirk]',
                    type: 'text'
                }
                break;
            case 'baby_one':
                //查询第一个宝贝
                break;
            case 'baby_two':
                //查询第二个宝贝
                break;
            case 'baby_three':
                //查询第三个宝贝
                break;
            case 'baby_four':
                //查询第四个宝贝
                break;
            case 'baby_five':
                //查询第五个宝贝
                break;
            case 'baby_more':
                //查询更多宝贝
                break;
            default:
                return {
                    content: '没有这个操作!',
                    type: 'text'
                }
                break;
        }

        await redis.set(key, value, 300)
        return returnMsg;
    }

}

module.exports = biz;