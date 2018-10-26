
const config = {
    wechat: {
        config: {
            appid: 'wx23147d6ed2ac27ef',
            AppSecret: 'fe9542e6c8fa0b1bbe814bb85b2c09f0',
            token: '9E8931D855252A4E8A4DF61AE835F85B',
            encodingAESKey: 'KUygOjXypVoFm4oPTPZnSA9I4SeFny439RX5LOQZt4x',
            checkSignature: true// 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
        },
        api: {
            //获取微信token
            getWxToken: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}',
            menuCreate: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}',
        }
    }
}

Object.assign(config, require('./system-config-evn'))

module.exports = Object.freeze(config);