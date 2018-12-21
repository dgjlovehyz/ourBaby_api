'use strict'

const redisConfig = require('../../config/system-config').redis;
const redis = require('../../framework/util/redis_client').redis(redisConfig);
const _ = require('underscore');
const uuid = require('uuid');
const moment = require('moment');
const childDao = require('../dao/child');
const userDao = require('../dao/user');
const dao = require('../../framework/util/dao');

class biz {

    static async addName(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        params.data.name = params.content;
        params.msg = '请输入宝宝性别：1.男 2.女'
        params.function = 'addSex'
        return params
    }

    static async addSex(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        params.data.sex = _.isNumber(params.content) ? params.content : params.content == '男' ? 1 : 2;
        params.msg = '请输入宝宝出生日日\n栗子：2018-01-31 09:18'
        params.function = 'addBirthData'
        return params
    }

    static async addBirthData(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        let birthTime

        birthTime = moment(params.content).format('YYYY-MM-DD HH:mm')
        if (_.isString(birthTime) && birthTime === 'Invalid date') {
            params.msg = '日期格式错误，请重新输入\n栗子：2018-01-31 09:18'
            return params
        }
        params.data.birthTime = birthTime;
        params.msg = '请输入你是宝宝的什么关系\n栗子：爸爸、妈妈'
        params.function = 'addUserRelation'

        return params
    }

    static async addUserRelation(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        params.data.userRelation = params.content;
        params.msg = '请输入宝宝是你的什么关系\n栗子：儿砸、侄子'
        params.function = 'addChildRelation'
        return params
    }

    static async addChildRelation(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        params.data.childRelation = params.content;

        return await dao.manageTransactionConnection(async (connection) => {
            if (!!params.data.uuid) {
                //有uuid，说明是绑定宝贝
                let user = await userDao.getUser(connection, { openId: params.openId })
                let child = await childDao.getChild(connection, { uuid: params.data.uuid })
                await childDao.insertUnion(connection, { userId: user.userId, childId: child.childId, userRelation: params.data.userRelation, childRelation: params.data.childRelation })
                params.msg = '宝宝绑定成功'
            } else {
                //没有uuid，说明是新增宝贝
                params.data.uuid = uuid.v1();
                let id = await childDao.insertClild(connection, params.data);
                let user = await userDao.getUser(connection, { openId: params.openId })
                await childDao.insertUnion(connection, { userId: user.userId, childId: id, userRelation: params.data.userRelation, childRelation: params.data.childRelation })
                params.msg = '宝宝添加成功'
            }
            delete params.function
            delete params.biz
            return params
        })
    }

    static async bindChild(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        params.data.uuid = params.content;
        params.msg = '请输入你是宝宝的什么关系\n栗子：爸爸、妈妈'
        params.function = 'addUserRelation'
        return params
    }

    /**
     * 按钮 - 查询宝贝
     * @param {*} params 
     */
    static async searchChildren(params) {
        let retMsg = {}
        return await dao.manageConnection(async (connection) => {
            let children = await childDao.selectChildByOpenid(connection, { openId: params.openId })
            if (!children || children.length <= 0)
                retMsg.msg = '您还没有创建宝贝档案，请根据指引创建或绑定宝贝！'
            else {
                let msg = '',
                    babyPetName = ['1、大宝 ', '2、二宝 ', '3、三宝 ', '4、四宝 ', '5、五宝 ', '6、六宝 ', '7、七宝 ', '8、八宝 ', '9、九宝 ',],
                    childList = {}
                if (babyPetName.length < children.length)
                    msg = '我不相信你有10个以上的孩子，就算真的有，我也不给你查出来'
                else {
                    children.forEach((child, index) => {
                        msg = msg + babyPetName[index] + child.childRelation + ':' + child.name + '\n'
                        childList['child' + (index + 1)] = child.childId
                    });
                    msg = msg + '请输入想要查询的宝贝编号\n栗子：想查询大宝，输入"1"即可'
                }
                retMsg.msg = msg
                retMsg.data = childList
            }
            retMsg.type = 'text'
            retMsg.biz = './children'
            retMsg.function = 'searchChildInfo'
            return retMsg
        })
    }

    static async searchChildInfo(params) {
        let retMsg = {}
        let childId = params.data['child' + params.content]
        return await dao.manageConnection(async (connection) => {
            let child = await childDao.getChildANDRelation(connection, { childId: childId, openId: params.openId })
            retMsg.msg = child.childRelation + ':' + child.name + '\n1、查询宝贝的编号\n2、查询宝贝今天的消息\n3、上传宝贝今日状态'
            retMsg.type = 'text'
            retMsg.function = 'babySearchChoise'
            return retMsg
        })
    }


    static async babySearchChoise(params) {
        let retMsg = {}
        if (params.content == 1) {
            //查询编号
        } else if (params.content == 2) {
            //查询今日消息
        } else if (params.content == 3) {
            //上传今日状态
        } else {
            retMsg.msg = '没有这个选择哦！请重新选一个'
        }
    }


}

module.exports = biz