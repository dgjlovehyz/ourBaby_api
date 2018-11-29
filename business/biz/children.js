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
        params.msg = '请输入宝宝出生日日\n栗子：2018-01-31 09:'
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
            params.data.uuid = uuid.v1();
            let id = await childDao.insertClild(connection, params.data);
            let user = await userDao.getUser(connection, { FromUserName: params.openId })
            await childDao.insertUnion(connection, { userId: user.userId, childId: id, userRelation: params.data.userRelation, childRelation: params.data.childRelation })
            params.msg = '宝宝添加成功'
            delete params.function
            delete params.biz
            return params
        })
    }
}

module.exports = biz