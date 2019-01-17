'use strict'


const dao = require('../../framework/util/dao');
const mediaDao = require('../dao/media');
const wxApi = require('../../util/wx_api');
const moment = require('moment');
const _ = require('underscore');

class biz {
    // 保存图片类型素材
    static async saveImgMedia(params) {

        return await dao.manageTransactionConnection(async (connection) => {
            return await this._saveImgMedia(connection, params)
        })
    }

    /**
     * 向外部提供接口
     * @param {*} connection 
     * @param {*} params 
     */
    static async _saveImgMedia(connection, params) {
        params.type = 'image'
        return await mediaDao.insertOrUpdateImgMedia(connection, params)
    }

    /**
     * 今日动态，处理今日动态，生成今日动态
     * @param {*} list 
     */
    static async newsHandle(connection, child, list) {

        if (list.length > 0) {
            //检查今日素材的第一个素材是不是永久素材，如果不是，则转化为永久素材
            if (list[0].state == 0) {
                try {
                    let mediaInfo = await wxApi.addMaterial({ imgPath: list[0].mediaPath })
                    // 更新该图片的状态和地址还有id
                    await mediaDao.updateImgMedia(connection, { mediaPath: mediaInfo.url, mediaId: mediaInfo.media_id, imgId: list[0].imgId, state: 1 })
                    list[0].mediaId = mediaInfo.media_id
                } catch (error) {
                    return '日常甩锅，微信出bug了'
                }
            }
            // 永久图片上传完成
            // 开始编辑图文素材 TODO:目前来说，只需要显示当天的以后再扩展
            //  每个宝贝是一个节点
            let diary = {
                title: '',
                thumb_media_id: '', //永久素材id，根据规则是每天上传的第一张图
                author: 'DGJ',
                digest: '', // 这个是简介，再卡片上显示用的，如果不填，会截取内容前面部分的描述
                show_cover_pic: 0, //是否显示封面，设置成图片比较少的时候显示，图片多了就不显示了
                content: '', //真正的内容
                content_source_url: 'http://121.196.212.213/template/index.html', //一个假的地址
            }
            //组装内容
            diary.title = child.name + '的日记 ' + moment().format('YYYY-MM-DD HH:DD')
            diary.thumb_media_id = list[0].mediaId
            diary.digest = list[0].imgDesc
            if (list.length <= 3)
                diary.show_cover_pic = 1

            let newsMediaInfo = await mediaDao.getNews(connection, { childId: child.childId })
            list.forEach(element => {
                let title = `<p style="text-align: center;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;">${child.userRelation}在${element.creatTime}上传</span></p>`
                let img = `<p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="${element.mediaPath}" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="${element.mediaPath}" crossorigin="anonymous" data-fail="0"></p>`
                let desc = `<p style="text-align: center;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;">${element.imgDesc}</span></p>`
                diary.content = diary.content + title + img + desc
            });
            try {
                if (!!newsMediaInfo) {
                    //存在，修改
                    await wxApi.updateNews({ diary: diary, mediaId: newsMediaInfo.mediaId })
                } else {
                    //不存在，新增
                    let mediaId = (await wxApi.addNews({ diary: diary })).media_id
                    await mediaDao.insertOrUpdateNews(connection, { childId: child.childId, mediaId: mediaId })
                    newsMediaInfo = {
                        mediaId: mediaId
                    }
                }
                // 获取
                let newsInfo = await wxApi.getNews({ mediaId: newsMediaInfo.mediaId })
                return newsInfo
            } catch (error) {
                return '报错啦，可以重试一下，如果还是不行，就别用了/(ㄒoㄒ)/~~'
            }
        } else {
            return '永远不可能走到这里'
        }
    }

}

module.exports = biz