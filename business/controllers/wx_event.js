'use strict'
const wxEBiz = require('../biz/wx_event');
class ctr {
    static async userSubscribe(params) {
        return await wxEBiz.userSubscribe(params);
    }
    static async userUnsubscribe(params) {
        return await wxEBiz.userUnsubscribe(params);
    }
}

module.exports = ctr;