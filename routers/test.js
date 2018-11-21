const wxCtr = require('../business/controllers/wx');
const wechat = require('wechat');
const wxConfig = require('../config/system-config').wechat.config;
const Exception = require('../framework/exception/exception');
const wxEventCtr = require('../business/controllers/wx_event');



let a = async () => {


    await wxEventCtr.clickEvent({ EventKey: 'baby_add', FromUserName: 'dgjtest' });

    let ret = await wxCtr.textHandle({ FromUserName: 'dgjtest', content: '央晶' });

    console.log('ret', ret)

    let ret1 = await wxCtr.textHandle({ FromUserName: 'dgjtest', content: '1' });

    console.log('ret1', ret1)

    let ret2 = await wxCtr.textHandle({ FromUserName: 'dgjtest', content: '2018-01-31 09:18' });

    console.log('ret1', ret2)

}
a()