'use strict'

const wxBiz = require('../biz/wx')

class ctl {

    /**
     * 微信权限验证，只有启用接口的时候需要调用
     * 
     * @param {*} params 
     */
    static async wxAuto(params) {
        return await wxBiz.wxAuto(params)
    }

    /**
     * 微信自动回复功能
     * 
     * @param {*} params 
     */
    static async wxMesage(params) {
        return await wxBiz.wxMesage(params);
    }

    static async textHandle(params) {
        return await wxBiz.textHandle(params)
    }
    static async imgHandle(params){
        return await wxBiz.imgHandle(params)
    }
}


module.exports = ctl