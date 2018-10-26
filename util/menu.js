'use strict'

const { menuCreate } = require('../constant/wx_menu');
const redis = require('./redis');
const wxApi = require('./wx_api');

module.exports = async function () {
    let isCreate = await redis.get('isCreate')
    if (isCreate != 'true') {
        //没有创建
        let result = await wxApi.menuCreate(menuCreate);
        console.log('wx menu create return:', result);
        if (result.errcode == 0) {
            //创建成功
            redis.set('isCreate', true)
        }
    }
}