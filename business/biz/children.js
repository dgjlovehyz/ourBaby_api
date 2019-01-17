'use strict'

const redisConfig = require('../../config/system-config').redis;
const redis = require('../../framework/util/redis_client').redis(redisConfig);
const _ = require('underscore');
const uuid = require('uuid');
const moment = require('moment');
const childDao = require('../dao/child');
const userDao = require('../dao/user');
const dao = require('../../framework/util/dao');
const wxApi = require('../../util/wx_api');
const getTagByNum = require('../../constant/wx_menu').getTagByNum;
const menuBase = require('../../constant/wx_menu').conditionalMenu;
const mediaBiz = require('./media');

class biz {
    /**
     * 宝贝新增部分，添加名称
     * @param {*} params 
     */
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

    /**
     * 宝贝新增部分，添加性别
     * @param {*} params 
     */
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

    /**
     * 宝贝新增部分，添加出生日期
     * @param {*} params 
     */
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

    /**
     * 添加用户和宝贝的关系
     * @param {*} params 
     */
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
    /**
     * 添加用户和宝贝的关系，并且完成宝贝的添加和关联关系
     * @param {*} params 
     */
    static async addChildRelation(params) {
        if (!params.content) {
            params.msg = '请重新输入'
            return params
        }
        if (!params.data)
            params.data = {}
        params.data.childRelation = params.content;

        return await dao.manageTransactionConnection(async (connection) => {
            let user = await userDao.getUser(connection, { openId: params.openId })
            if (!user) {
                params.msg = '用户信息不足，请重新关注公众号'
                return params
            }
            if (!!params.data.uuid) {
                //有uuid，说明是绑定宝贝
                let child = await childDao.getChild(connection, { uuid: params.data.uuid })
                if (!child) {
                    params.msg = '编号有问题'
                    return params
                }
                await childDao.insertUnion(connection, { userId: user.userId, childId: child.childId, userRelation: params.data.userRelation, childRelation: params.data.childRelation })
                params.msg = '宝宝绑定成功'
            } else {
                //没有uuid，说明是新增宝贝
                params.data.uuid = uuid.v1();
                let id = await childDao.insertClild(connection, params.data);
                await childDao.insertUnion(connection, { userId: user.userId, childId: id, userRelation: params.data.userRelation, childRelation: params.data.childRelation })
                params.msg = '宝宝添加成功'
            }
            //新增宝贝以后需要更新宝贝的菜单，标签
            let menuMsg = await this.updateUserTagOrMenu(connection, user)
            if (menuMsg != 'success') {
                console.log('menuMsg', menuMsg)
                params.msg = '宝宝添加成功,但是自定义菜单出现异常'
            }
            delete params.function
            delete params.biz
            return params
        })
    }

    /**
     * 用uuid关联宝贝
     * @param {*} params 
     */
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

    /*************************************************TODO:分割线-以上是新增，关联宝贝的部分*************************************************/
    /**
     * 和微信公众号有关，用户添加修改标签，还有星标朋友菜单更新菜单，反正麻烦死的东西，所以在别人的基础上做自己的东西，就是这么麻烦，偏偏没办法不用
     * 最开始没想做这么复杂的 _(´ཀ`」 ∠)_
     */
    static async updateUserTagOrMenu(connection, user) {
        let children = await childDao.selectChildByOpenid(connection, { openId: user.openId }),
            userTag,
            isSuperUserFun = (tagidList) => {
                let id = tagidList.find(id => {
                    return id == 2//TODO:目前星标朋友 标签id都是2，如果以后有变化就在这这里改
                })
                if (!!id)
                    return true
                else
                    return false
            },
            isSuperUser = false;
        try {
            userTag = await wxApi.getUserTag({ openId: user.openId })
            isSuperUser = isSuperUserFun(userTag.tagid_list)
        } catch (error) {
            console.error('updateUserTagOrMenu:getUserTag:', error)
            return '日常甩锅，微 信出bug了，标记1'
        }
        return await dao.manageTransactionConnection(async (connection) => {

            if (isSuperUser) {
                //超级用户，菜单定制
                let menu = await userDao.getUserMenu(connection, { userId: user.userId })

                if (!menu) {
                    menu = {
                        jsonString: menuBase
                    }
                }
                let newBtn = []

                children.forEach((child, index) => {
                    let subBtn = {
                        type: 'click',
                        name: child.name,
                        key: ''
                    }
                    switch (index) {
                        case 0:
                            subBtn.key = 'baby_one'
                            newBtn.push(subBtn)
                            break;
                        case 1:
                            subBtn.key = 'baby_two'
                            newBtn.push(subBtn)
                            break;
                        case 2:
                            subBtn.key = 'baby_three'
                            newBtn.push(subBtn)
                            break;
                        case 3:
                            subBtn.key = 'baby_four'
                            newBtn.push(subBtn)
                            break;
                        case 4:
                            subBtn.key = 'baby_five'
                            newBtn.push(subBtn)
                            break;
                        default:
                            subBtn.key = 'baby_more'
                            subBtn.name = '更多宝贝'
                            newBtn[4] = subBtn
                            break;
                    }
                })
                let obj;
                if (_.isString(menu.jsonString))
                    obj = JSON.parse(menu.jsonString)
                else
                    obj = menu.jsonString
                obj.button.forEach(btn => {
                    if (btn.name == '我的宝贝')
                        btn.sub_button = newBtn;
                })
                try {
                    if (!!menu.menuId)
                        // 已经创建过菜单，更新菜单即可，没有更新操作，所以删除重建
                        // 删除
                        await wxApi.conditionalMenuDelete({ menuId: menu.menuId })
                    if (!obj.matchrule.tag_id) {
                        // 还没有创建过菜单，需要新建标签，新建菜单
                        // 首先需要创建一个标签
                        let tagBody = await wxApi.addUserTag({ tagName: user.openId })
                        obj.matchrule.tag_id = tagBody.tag.id
                        // 标签和用户关联
                        await wxApi.userAddTag({ openId: user.openId, tagId: tagBody.tag.id })
                    }
                    // 发送 重建 请求
                    let body = await wxApi.conditionalMenuCreate(obj);
                    menu.menuId = body.menuid
                } catch (error) {
                    return '日常甩锅，微 信出bug了，标记2'
                }

                // 更新菜单管理
                await userDao.insertOrUpdateMenu(connection, { userId: user.userId, menuId: menu.menuId, jsonString: JSON.stringify(obj) })
            } else {
                // 普通用户，通用菜单,按照标签关联菜单，
                try {
                    if (userTag.tagid_list.length > 0) {
                        //说明这个用户已经关联过标签了，理论上只有一个标签
                        await wxApi.cancelUserTag({ openId: user.openId, tagId: userTag.tagid_list[0] })
                    }
                    let tagId = await getTagByNum(children.length)
                    await wxApi.userAddTag({ openId: user.openId, tagId: tagId })
                } catch (error) {
                    return '日常甩锅，微 信出bug了，标记3'
                }
            }
            return 'success'
        })
    }

    /*************************************************TODO:分割线-以上是公众号菜单的操作*************************************************/

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

    /**
     * 通过序号查询宝贝，这个需要是按照
     * @param {*} params 
     * @param {*} index 
     */
    static async searchChildInfoByIndex(params, index) {
        params.index = index;
        return await this.searchChildInfo(params)
    }
    static async searchChildInfo(params) {
        let retMsg = {},
            query = {}
        query.openId = params.openId
        let index = 0;
        if (!!params.index || params.index == 0) {
            // 按照索引查询，
            query.index = params.index
            index = params.index
        } else if (!!params.content) {
            // 按照宝贝id查询
            query.childId = params.data['child' + params.content]
            index = params.content - 1
        }
        return await dao.manageConnection(async (connection) => {
            let child = await childDao.getChildANDRelation(connection, query)
            retMsg.msg = child.childRelation + ':' + child.name + '\n1、查询宝贝的编号\n2、查询宝贝今天的消息\n3、上传宝贝今日状态'
            retMsg.type = 'text'
            retMsg.biz = './children'
            retMsg.function = 'babySearchChoise'
            retMsg.data = child
            retMsg.data.index = index
            return retMsg
        })
    }


    static async babySearchChoise(params) {
        let retMsg = {}
        if (params.content == 1) {
            //查询编号
            retMsg.msg = '宝贝编号：' + params.data.uuid + '\n1、查询宝贝的编号\n2、查询宝贝今天的消息\n3、上传宝贝今日状态'
            retMsg.function = 'babySearchChoise'
            retMsg.data = params.data
        } else if (params.content == 2) {
            //查询今日消息

        } else if (params.content == 3) {
            //上传今日状态
            retMsg.msg = '请发送一张图片'
            retMsg.function = 'addBabyImg'
            retMsg.data = params.data
        } else {
            retMsg.msg = '没有这个选择哦！请重新选一个'
        }
        retMsg.biz = './children'

        return retMsg;
    }

    static async addBabyImg(params) {
        let retMsg = {}
        if (!params.imgPath || !(params.imgPath.indexOf('http://') >= 0)) {
            retMsg.msg = '没有收到图片哦'
        } else {
            retMsg.msg = '请给上传的图片写一段描述\n栗子：儿子第一次吃馒头'
            retMsg.data = params.data
            retMsg.data.imgPath = params.imgPath
            retMsg.data.mediaId = params.mediaId
            retMsg.function = 'addImgComment'
        }
        retMsg.biz = './children'
        return retMsg;
    }

    static async addImgComment(params) {
        let retMsg = {}
        if (!params.content) {
            retMsg.msg = '请重新输入'
            return retMsg
        }

        return await dao.manageTransactionConnection(async (connection) => {
            let imgId = await mediaBiz._saveImgMedia(connection, params)
            // 保存今日状态
            await childDao.insertOrUpdateChildDiary(connection, { childId: params.data.childId, imgId: imgId, imgDesc: params.content })
            // 查当天的动态
            let imgList = await childDao.searchDiary(connection, { childId: params.data.childId })
            if (imgList.length <= 0) {
                retMsg.msg = '今日动态保存失败或遇到其他问题'
                return retMsg;
            }
            //处理永久图文素材，然后返回给用户
            let newsInfo = (await mediaBiz.newsHandle(connection, params.data, imgList)).news_item[0]
            if (_.isString(newsInfo))
                retMsg.msg = newsInfo
            else {
                retMsg.msg = [{
                    title: newsInfo.title,
                    description: newsInfo.digest,
                    picurl: imgList[0].mediaPath,
                    url: newsInfo.url + '&t=' + Date.now()
                }]
            }
            return retMsg
        })
    }

}

module.exports = biz