'use strict'

const redis = require('../../framework/util/redis_client').redis;
const _ = require('underscore');
const uuid = require('uuid');
const moment = require('moment');
const childDao = require('../dao/child');
const dao = require('../../framework/util/dao');

class biz {

    static async addName(params) {
        if (!params.content)
            return params.msg = '请重新输入'
        params.data.name = params.content;
        params.msg = '请输入宝宝性别：1.男 2.女'
        params.function = 'addSex'
        return params
    }

    static async addSex(params) {
        if (!params.content)
            return params.msg = '请重新输入'
        params.data.sex = _.isNumber(params.content) ? params.content : params.content == '男' ? 1 : 2;
        params.msg = '请输入宝宝出生日日期、栗子：2018-01-31 09:'
        params.function = 'addBirthData'
        return params
    }

    static async addBirthData(params) {
        if (!params.content)
            return params.msg = '请重新输入'
        let birthTime
        try {
            birthTime = moment(params.content).format('YYYY-MM-DD HH:mm')
        } catch (error) {
            params.msg = '日期格式错误，请重新输入\n栗子：2018-01-31 09:18'
            return params
        }
        params.data.birthTime = birthTime;

        return await dao.manageTransactionConnection(async (connection) => {
            params.data.uuid = uuid.v1();
            await childDao.insertClild(connection, params.data);
            params.msg = '添加成功'
            delete params.function
            delete params.biz
            return params
        })


    } s
}

module.exports = biz