
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
            // 获取微信token
            getWxToken: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid={0}&secret={1}',
            // 创建菜单，这个是默认菜单
            menuCreate: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token={0}',
            // 删除菜单
            menuDelete: 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token={0}',
            // 创建个性化菜单
            conditionalMenuCreate: 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token={0}',
            // 个性化菜单删除
            conditionalMenuDelete: 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token={0}',
            // 添加永久素材素材，比较麻烦，需要通过request.get获取图片流，在上传
            addMaterial: 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token={0}',
            // 和上面的一样，但是通过微信公众号获取的图片，已经是这类图片了，不需要再做操作，这个接口应该是微信提供给外部图片的
            uploadImg: 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token={0}',
            // 创建用户标签
            addUserTag: 'https://api.weixin.qq.com/cgi-bin/tags/create?access_token={0}',
            // 获取用户的标签
            getUserTag: 'https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token={0}',
            // 给用户添加标签
            userAddTag: 'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token={0}',
            // 取消用户身上的标签
            cancelUserTag: 'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token={0}',

        }
    }
}

Object.assign(config, require('./system-config-evn'))

module.exports = Object.freeze(config);