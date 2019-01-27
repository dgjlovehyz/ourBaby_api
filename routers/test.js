

const wxCtr = require('../business/controllers/wx');
const wechat = require('wechat');
const wxConfig = require('../config/system-config').wechat.config;
const Exception = require('../framework/exception/exception');
const wxEventCtr = require('../business/controllers/wx_event');
const request = require('request');



let a = async () => {

    // let ret = await wxEventCtr.clickEvent({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', EventKey: 'baby_relation' });
    // console.log(ret)

    // let ret2 = await wxCtr.textHandle({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', Content: '3a55dfe0-f444-11e8-9c64-c1d4068befed' });

    // let ret = await wxCtr.textHandle({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', Content: '央晶' });

    // console.log('ret', ret)

    // let ret1 = await wxCtr.textHandle({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', content: '1' });

    // console.log('ret1', ret1)

    // let ret2 = await wxCtr.textHandle({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', content: '2018-01-31 09:18' });

    // console.log('ret1', ret2)

    let ret3 = await wxCtr.textHandle({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', Content: '爸爸' });

    console.log('ret1', ret3)

    let ret4 = await wxCtr.textHandle({ FromUserName: 'oH9Bt1ROu1BpuNtL2rZatH13M-xk', Content: '女儿' });

    console.log('ret1', ret4)
}
// a()

let b = async () => {
    let url = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=' + '17_ZN7VwQakiWijvRcKHTWUF4smbvbXPMm0kd6_D6hm7Ybqgu_7cIJYU2soBs1N1doCeLXoa8s7IajbKsA9q6eQBKpiQ3blE5w_kfe7aq4lrIcfDzcOs9EhF3TT9m0GEKhAEAKIO'
    request.get('http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPRibeBwYPfALFN72rpSIZjDAGhrALGv9icOE3ldWKLLnCMWWBowzDJCJOn4aylpJtibgaiaibc8ZLwmRcQ/0').on('response', (response) => {
        request({
            url: url,
            method: 'POST',
            formData: {
                buffer: {
                    value: response,
                    options: {
                        filename: '1.png',
                        contentType: 'image/png'
                    }
                },

            }
        }, (err, resp, body) => {
            console.log('response:', err, resp, bodys)
        })
    })
}
// b()

let c = async () => {
    // let img = 'http://mmbiz.qpic.cn/mmbiz_jpg/UWb6Bewgh97Xp3iakr2dSBZKJWNDJPNlTaX5VECicTflW6T2VfkwOEUoYzF7LicqgfW55tc32pPZJRlV2YdmVQJDA/0'
    let url = 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=' + '17_u3iM1QhfBh_243mDinDvpcgbMI_rrgjjEyxoZPmItSCORIZfR8ucVYuLCvQOyxwRAKOsdUsRcCIsCo9ULZhNB38yAycQMdcfYSCjrC7Mo8yU52x-nDptkzRvU5TxSRHRqUuDDMMxBYjq4l8PUPJdAAAJEY'

    let reqInfo = {
        url: url,
        method: 'POST',
        json: true,
        body: {
            articles: [
                {
                    title: '出生篇：2018年01月30日 09:18 央晶来到这个世界',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5MfWSQy7UTfyXyqPBvU6T_TMI',
                    author: 'DGJ',
                    digest: '2018年01月30日 09:18 央晶来到这个世界',
                    show_cover_pic: 0,
                    content: 'haha',
                    content_source_url: 'http://121.196.212.213/template/index.html',

                },
                {
                    title: '睡觉篇：多姿多彩的。。。睡觉',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5Mfck-6FrLoC_8kRjxkSlV35Y',
                    author: 'DGJ',
                    digest: '多姿多彩的。。。睡觉',
                    show_cover_pic: 0,
                    content: `hahah`,
                    content_source_url: 'http://121.196.212.213/template/index.html',

                },
                {
                    title: '卖萌篇：我萌我骄傲',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5MfSt5gR9BulHbkOTDp40aOlk',
                    author: 'DGJ',
                    digest: '我萌我骄傲',
                    show_cover_pic: 0,
                    content: `hahah`,
                    content_source_url: 'http://121.196.212.213/template/index.html',

                },
                {
                    title: '成长篇：吃的是奶，长的是肉',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5MfbUuWQuPx9oFWMVv1WffFlI',
                    author: 'DGJ',
                    digest: '吃的是奶，长的是肉',
                    show_cover_pic: 0,
                    content: `hahah`,
                    content_source_url: 'http://121.196.212.213/template/index.html',

                },
                {
                    title: '颜值巅峰：总有那么几天感觉特别漂亮',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5MfRjT6d_5GB3zAxD6LRPsfqQ',
                    author: 'DGJ',
                    digest: '总有那么几天感觉特别漂亮',
                    show_cover_pic: 0,
                    content: `hhhaaha`,
                    content_source_url: 'http://121.196.212.213/template/index.html',

                },
            ]
        }
    }

    request(reqInfo, (err, resp, body) => {
        console.log('结果：', err, resp, body)
        // 9Jq0DLU5kdSzRies2N5MfSCyRRC_QFaSa5c5Mnkkme4 不知道怎么用，有点尴尬
    })
}
// c()

let d = async () => {
    let url = 'https://api.weixin.qq.com/cgi-bin/material/add_material?type=image&access_token=' + '17_hij20drYR1dvB6r_Dnzru84sYzUJXySLoo1vCyIU1aJ-ht3Lvx4xe2UhUuvHU4iKtMSOU2k7W2p8ijVXswE7RSdAKTFwkOMD8GHUECswNh3b2P0VuM5Z8bRx9aqA-l_UPJvvmfsS0fnpz93UVYOdAFAKND'

    request.get('http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPRibeBwYPfALFN72rpSIZjDArqcBxL7PkoHJl7bCVLIYGWb6r6KozZYXIibF4hwAQBTYjn7ouvJQwTg/0').on('response', (response) => {
        request({
            url: url,
            method: 'POST',
            formData: {
                media: {
                    value: response,
                    options: {
                        filename: '2.png',
                        contentType: 'image/png'
                    }
                },

            }
        }, (err, resp, body) => {
            console.log('response:', err, resp, bodys)
        })
    })
}

// d()
// c()

let e = (name) => {
    let a = 0

    let b = a || 1

    console.log(b)

}
const wxToken = '17_PBhYzvZmhsEh0BEL-Y1BWjWddeU4eO_9fHcmyj28N6usKLGqGg4l8aFhXgdLVcv1EWMyhcs_LKB7E0mZm4yiyLs3EaeK2TWNzOQOJP6vRQMqz1wx24ITAIiiEklYEifhc1mspxo01SMEaB88SOAiAAACYK'
let updateNews = async () => {
    let url = 'https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=' + wxToken

    let one = {
            title: '出生篇：2018年01月30日 09:18 央晶来到这个世界',
            thumb_media_id: '9Jq0DLU5kdSzRies2N5MfWSQy7UTfyXyqPBvU6T_TMI',
            author: 'DGJ',
            digest: '2018年01月30日 09:18 央晶来到这个世界',
            show_cover_pic: 0,
            content: `<section class="" data-tools="135编辑器" data-id="94151" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="text-align: center;padding-top: 1em;padding-bottom: 1em;box-sizing: border-box;"><section style="display: flex;justify-content: center;align-items: center;"><section style="display: flex;justify-content: flex-end;margin-top: -12px;"><section style="display: inline-block;width: 0.4em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-right: 3px;box-sizing: border-box;"></section><section style="display: inline-block;width: 0.9em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-right: -5px;box-sizing: border-box;"></section></section><section style="width: 1.8em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-top: 8px;margin-left: -1.6em;box-sizing: border-box;"></section><section style="display:inline-block;"><section class="" data-brushtype="text" style="background: rgb(251, 239, 46);color: rgb(152, 99, 0);letter-spacing: 1.5px;padding: 10px 1.6em;transform: rotate(0deg);">2018年01月30日 09:18</section><section data-bgless="spin" data-bglessp="280" data-bgopacity="80%" style="width:100%;background:rgba(251,239,46,0.3);height: 40px;margin-top: -34px;margin-left:6px;" data-width="100%"></section></section><section style="display: flex;justify-content: flex-end;margin-top: -12px;"><section style="display: inline-block;width: 0.4em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;box-sizing: border-box;"></section><section style="display: inline-block;width: 0.9em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-left: 3px;box-sizing: border-box;"></section></section><section style="width: 1.2em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-top: 8px;margin-left: -1.6em;box-sizing: border-box;"></section></section></section></section>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRr5YVc5xsM2HgSUfxylFJwn6Z83Wv8UzKrjeDJlDk2sq8eu7IMyAd7g/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRr5YVc5xsM2HgSUfxylFJwn6Z83Wv8UzKrjeDJlDk2sq8eu7IMyAd7g/0" crossorigin="anonymous" data-fail="0"></p>
            <p style="text-align: center;margin-top: 5px;margin-bottom: 18px;font-family: tahoma, verdana, helvetica;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;font-family: 微软雅黑;">　　<strong>一出病房就睁开眼睛到处看，脸上都是胎脂，丑丑的</strong></span></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>

            <section class="" data-tools="135编辑器" data-id="94389" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="text-align: center;"><section style="display: inline-block;"><section style="text-align:right;margin-bottom: -15px;"><section style="display: inline-block;width: 16px;height: 13px;color: rgb(179, 220, 226);border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);margin-right: -10px;box-sizing: border-box;"><section style="width: 11px;height: 1px;background: rgb(179, 220, 226);margin-top: 5px;margin-right: auto;margin-left: auto;"></section><section style="width: 1px;height: 7px;background: rgb(179, 220, 226);margin-top: -4px;margin-right: auto;margin-left: auto;"></section></section></section><section class="" data-brushtype="text" style="border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);letter-spacing: 1.5px;color: rgb(63, 63, 63);padding: 6px 1.2em;box-sizing: border-box;"><strong><span style="color: #00b0f0;">出生第二天</span></strong></section></section></section></section>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRWUz7vUgQOzOTiat8HaduyU6u4MAvPWQbib1y2XZ2tcST13K4PyicH71QQ/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRWUz7vUgQOzOTiat8HaduyU6u4MAvPWQbib1y2XZ2tcST13K4PyicH71QQ/0" crossorigin="anonymous" data-fail="0"></p>
            <p style="text-align: center;margin-top: 5px;margin-bottom: 18px;font-family: tahoma, verdana, helvetica;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;font-family: 微软雅黑;">　　<strong>今天洗了澡，好看多啦，就是有点吐水（据说是羊水）</strong></span></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>


            <section class="" data-tools="135编辑器" data-id="94389" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="text-align: center;"><section style="display: inline-block;"><section style="text-align:right;margin-bottom: -15px;"><section style="display: inline-block;width: 16px;height: 13px;color: rgb(179, 220, 226);border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);margin-right: -10px;box-sizing: border-box;"><section style="width: 11px;height: 1px;background: rgb(179, 220, 226);margin-top: 5px;margin-right: auto;margin-left: auto;"></section><section style="width: 1px;height: 7px;background: rgb(179, 220, 226);margin-top: -4px;margin-right: auto;margin-left: auto;"></section></section></section><section class="" data-brushtype="text" style="border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);letter-spacing: 1.5px;color: rgb(63, 63, 63);padding: 6px 1.2em;box-sizing: border-box;"><strong><span style="color: #00b0f0;">出生第三天</span></strong></section></section></section></section>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRianQ71Y71hl19iawm7AkIiaXjAJR7InmqxjPcAZfIYGIopx5nFT1iad35w/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRianQ71Y71hl19iawm7AkIiaXjAJR7InmqxjPcAZfIYGIopx5nFT1iad35w/0" crossorigin="anonymous" data-fail="0"></p>
            <p style="text-align: center;margin-top: 5px;margin-bottom: 18px;font-family: tahoma, verdana, helvetica;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;font-family: 微软雅黑;">　　<strong>傲娇的姿势，吃货的心</strong></span></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            
            <section class="" data-tools="135编辑器" data-id="94236" style="text-align: center;border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="width: 98%;margin-right: auto;margin-left: auto;background-image: -webkit-linear-gradient(left, rgb(254, 227, 231), rgb(197, 193, 247));" data-width="98%"><section style="padding: 4px;box-sizing: border-box;"><section style="background: #fefefe;"><section style="background: url(&quot;https://mmbiz.qpic.cn/mmbiz_png/yPElRamGu4dflmEDKzIyQRzAIlAdbkzYePz2iaJ4NYicWkZrvtqKG22ib9Dbo6FDFSCRLoqOkoY6J0wbyl0f3IEfA/640?wx_fmt=png&quot;) left bottom / 40px no-repeat;"><section data-autoskip="1" class="" style="font-size: 14px;letter-spacing: 1.5px;line-height: 1.75em;color: rgb(109, 98, 149);padding: 1em 1em 1.6em;box-sizing: border-box;"><p style="line-height: 2em;"><span style="color: #000000;">慵懒，撒娇的样子，是在麻麻肚子里就练就好的技能呢！我嘟嘟嘴你以为我是在卖萌吗？我是长大了，能模糊的看见爸爸妈妈的样子，从而惊叹不已哦。</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class=" __bg_gif" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRqa7XOqPI7aB0sbULib05ayPzT5d3Ds5tBGF3ibgs7UFbTRWicXLgM6g8Q/0" data-type="png" data-w="480" height="248" style="width: 250px !important; height: auto !important; visibility: visible !important;" title="timg.gif" width="125" _width="125px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRqa7XOqPI7aB0sbULib05ayPzT5d3Ds5tBGF3ibgs7UFbTRWicXLgM6g8Q/0" data-order="1" data-fail="0"></span></p><p style="line-height: 2em;"><span style="color: #000000;">刚出生的时候</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class="" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRD93OeEoAmVE6q1UCFcHY3xhRDcRwibF8QT61CwhNdH8N9NDxeWbFwCA/0" data-type="png" data-w="433" height="172" style="width: 172px !important; height: auto !important; visibility: visible !important;" width="172" _width="172px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRD93OeEoAmVE6q1UCFcHY3xhRDcRwibF8QT61CwhNdH8N9NDxeWbFwCA/0" crossorigin="anonymous" data-fail="0"></span></p><p style="text-align: center;line-height: 2em;"><span style="color: #000000;">长大一点嘟嘴更萌哦</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class="" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRkjRfGdOJ9j63Hrkc8U79s8gPxbOQ4GUDrpM9DrK5SmnDN9cMpYFvpA/0" data-type="png" data-w="433" height="172" style="width: 172px !important; height: auto !important; visibility: visible !important;" width="172" _width="172px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPSYx0NZnZlTaLZianLVMXlxRkjRfGdOJ9j63Hrkc8U79s8gPxbOQ4GUDrpM9DrK5SmnDN9cMpYFvpA/0" crossorigin="anonymous" data-fail="0"></span></p></section></section></section></section></section></section>
            `,
            content_source_url: 'http://121.196.212.213/template/index.html',
        },
        two = {
            title: '睡觉篇：多姿多彩的。。。睡觉',
            thumb_media_id: '9Jq0DLU5kdSzRies2N5Mfck-6FrLoC_8kRjxkSlV35Y',
            author: 'DGJ',
            digest: '多姿多彩的。。。睡觉',
            show_cover_pic: 0,
            content: `<section class="" data-tools="135编辑器" data-id="94151" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="text-align: center;padding-top: 1em;padding-bottom: 1em;box-sizing: border-box;"><section style="display: flex;justify-content: center;align-items: center;"><section style="display: flex;justify-content: flex-end;margin-top: -12px;"><section style="display: inline-block;width: 0.4em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-right: 3px;box-sizing: border-box;"></section><section style="display: inline-block;width: 0.9em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-right: -5px;box-sizing: border-box;"></section></section><section style="width: 1.8em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-top: 8px;margin-left: -1.6em;box-sizing: border-box;"></section><section style="display:inline-block;"><section class="" data-brushtype="text" style="background: rgb(251, 239, 46);color: rgb(152, 99, 0);letter-spacing: 1.5px;padding: 10px 1.6em;transform: rotate(0deg);">睡觉才是正事</section><section data-bgless="spin" data-bglessp="280" data-bgopacity="80%" style="width:100%;background:rgba(251,239,46,0.3);height: 40px;margin-top: -34px;margin-left:6px;" data-width="100%"></section></section><section style="display: flex;justify-content: flex-end;margin-top: -12px;"><section style="display: inline-block;width: 0.4em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;box-sizing: border-box;"></section><section style="display: inline-block;width: 0.9em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-left: 3px;box-sizing: border-box;"></section></section><section style="width: 1.2em;height: 5px;background: rgb(254, 231, 34);border-radius: 5px;margin-top: 8px;margin-left: -1.6em;box-sizing: border-box;"></section></section></section></section>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPRgzibY3I510Jicxib0whsEicNlsk1Z0IlibnIJO1IWiacVy25xBR0Liaarcwj6ianAYCbLWUmVqSJCvT6tVA/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPRgzibY3I510Jicxib0whsEicNlsk1Z0IlibnIJO1IWiacVy25xBR0Liaarcwj6ianAYCbLWUmVqSJCvT6tVA/0" crossorigin="anonymous" data-fail="0"></p>
            <p style="text-align: center;margin-top: 5px;margin-bottom: 18px;font-family: tahoma, verdana, helvetica;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;font-family: 微软雅黑;">　　<strong>睡觉也要捧着脸</strong></span></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            
            <section class="" data-tools="135编辑器" data-id="94389" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="text-align: center;"><section style="display: inline-block;"><section style="text-align:right;margin-bottom: -15px;"><section style="display: inline-block;width: 16px;height: 13px;color: rgb(179, 220, 226);border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);margin-right: -10px;box-sizing: border-box;"><section style="width: 11px;height: 1px;background: rgb(179, 220, 226);margin-top: 5px;margin-right: auto;margin-left: auto;"></section><section style="width: 1px;height: 7px;background: rgb(179, 220, 226);margin-top: -4px;margin-right: auto;margin-left: auto;"></section></section></section><section class="" data-brushtype="text" style="border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);letter-spacing: 1.5px;color: rgb(63, 63, 63);padding: 6px 1.2em;box-sizing: border-box;"><strong><span style="color: #00b0f0;">biubiubiubiu</span></strong></section></section></section></section>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5KFP5IFUqX7R37MiaYoSzswkZWGccHcJUMGOtpoB4hLWFoibcrkderU5g/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5KFP5IFUqX7R37MiaYoSzswkZWGccHcJUMGOtpoB4hLWFoibcrkderU5g/0" crossorigin="anonymous" data-fail="0"></p>
            <p style="text-align: center;margin-top: 5px;margin-bottom: 18px;font-family: tahoma, verdana, helvetica;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;font-family: 微软雅黑;">　　<strong>我是奥特曼~~biubiubiu~~</strong></span></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>

            <section class="" data-tools="135编辑器" data-id="94389" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="text-align: center;"><section style="display: inline-block;"><section style="text-align:right;margin-bottom: -15px;"><section style="display: inline-block;width: 16px;height: 13px;color: rgb(179, 220, 226);border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);margin-right: -10px;box-sizing: border-box;"><section style="width: 11px;height: 1px;background: rgb(179, 220, 226);margin-top: 5px;margin-right: auto;margin-left: auto;"></section><section style="width: 1px;height: 7px;background: rgb(179, 220, 226);margin-top: -4px;margin-right: auto;margin-left: auto;"></section></section></section><section class="" data-brushtype="text" style="border-width: 1px;border-style: solid;border-color: rgb(179, 220, 226);letter-spacing: 1.5px;color: rgb(63, 63, 63);padding: 6px 1.2em;box-sizing: border-box;"><strong><span style="color: #00b0f0;">整张床都是我的</span></strong></section></section></section></section>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPRgzibY3I510Jicxib0whsEicNl7JodGicyrsf5QibbHoUo2jQ8tl0yLHxmk5ibnmAibYgCibj2j14tN5C9ebA/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/I9E8zzcgdPRgzibY3I510Jicxib0whsEicNl7JodGicyrsf5QibbHoUo2jQ8tl0yLHxmk5ibnmAibYgCibj2j14tN5C9ebA/0" crossorigin="anonymous" data-fail="0"></p>
            <p style="text-align: center;margin-top: 5px;margin-bottom: 18px;font-family: tahoma, verdana, helvetica;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;font-family: 微软雅黑;">　　<strong>没有睡不下的床，只有不够宽的被子</strong></span></p>
            <p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;line-height: 2em;letter-spacing: 2px;"><br></p>

            <section class="" data-tools="135编辑器" data-id="88696" data-color="#fcb42b" data-custom="#fcb42b" style="max-width: 100%;font-variant-numeric: normal;font-variant-east-asian: normal;white-space: normal;widows: 1;letter-spacing: 0.483556px;line-height: 22.7556px;border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="margin: 10px auto;max-width: 100%;text-align: center;"><section style="margin-bottom: -14px;max-width: 100%;"><section style="padding-right: 20px;padding-bottom: 5px;padding-left: 20px;max-width: 100%;display: inline-block;border-bottom: 1px solid rgb(210, 0, 255);box-sizing: border-box;"><section style="margin-bottom: -10px;padding-right: 10px;padding-bottom: 10px;padding-left: 10px;max-width: 100%;border-bottom: 1px solid rgb(210, 0, 255);box-sizing: border-box;"><p class="" data-brushtype="text" style="max-width: 100%;min-height: 1em;font-size: 18px;font-weight: bold;color: #d200ff;min-width: 1em;"><span style="max-width: 100%;font-size: 14px;color: #7030a0;">放飞自我</span></p></section></section></section><section style="margin-right: auto;margin-left: auto;max-width: 100%;width: 20px;height: 20px;border-right: 1px solid #d200ff;border-bottom: 1px solid #d200ff;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-o-transform: rotate(45deg);"></section></section></section>
            <section class="" data-tools="135编辑器" data-id="94236" style="border-width: 0px;border-style: none;border-color: initial;box-sizing: border-box;"><section style="width: 98%;margin-right: auto;margin-left: auto;background-image: -webkit-linear-gradient(left, rgb(254, 227, 231), rgb(197, 193, 247));" data-width="98%"><section style="padding: 4px;box-sizing: border-box;"><section style="background: #fefefe;"><section style="background: url(&quot;https://mmbiz.qpic.cn/mmbiz_png/yPElRamGu4dflmEDKzIyQRzAIlAdbkzYePz2iaJ4NYicWkZrvtqKG22ib9Dbo6FDFSCRLoqOkoY6J0wbyl0f3IEfA/640?wx_fmt=png&quot;) left bottom / 40px no-repeat;"><section data-autoskip="1" class="" style="font-size: 14px;letter-spacing: 1.5px;line-height: 1.75em;color: rgb(109, 98, 149);padding: 1em 1em 1.6em;box-sizing: border-box;"><p style="text-align: center;line-height: 2em;"><span style="color: #000000;">趴着睡</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class=" __bg_gif" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5mZ2WjtNydjkibfbEia9ZDunrNaIqGpnn28xhoIbd9JCepN7vLlygTjdA/0" data-type="png" data-w="480" height="250" style="width: 380px !important; height: auto !important; visibility: visible !important;" title="timg.gif" width="125" _width="125px" src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5mZ2WjtNydjkibfbEia9ZDunrNaIqGpnn28xhoIbd9JCepN7vLlygTjdA/0" data-order="1" data-fail="0"></span></p><p style="text-align: center;line-height: 2em;"><span style="color: #000000;">卷着趴</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class="" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5t0IA39jjs8uDXKWM6kkI0pkms2agIgviapyOPZJAZiaicZXRLuHbPtGIg/0" data-type="png" data-w="433" height="172" style="width: 340px !important; height: auto !important; visibility: visible !important;" width="172" _width="172px" src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5t0IA39jjs8uDXKWM6kkI0pkms2agIgviapyOPZJAZiaicZXRLuHbPtGIg/0" crossorigin="anonymous" data-fail="0"></span></p><p style="line-height: 2em;text-align:center;;"><span style="color: #000000;">倒头就睡</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class="" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5ib0tpjJ3mkesnZprIjInVCq9ibdoTKOwsgQ59RsPBTSSAA200340x2KQ/0" data-type="png" data-w="433" height="172" style="width: 340px !important; height: auto !important; visibility: visible !important;" width="172" _width="172px" src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5ib0tpjJ3mkesnZprIjInVCq9ibdoTKOwsgQ59RsPBTSSAA200340x2KQ/0" crossorigin="anonymous" data-fail="0"></span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;">翻过来继续睡</span></p><p style="line-height: 2em;text-align: center;"><span style="color: #000000;"><img class="" data-ratio="1" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5jv1Z9NqKLKXoiagakgKWfDL97GAicSXlfRvD0ok4w7G0N6mj5OicSDBNQ/0" data-type="png" data-w="433" height="172" style="width: 340px !important; height: auto !important; visibility: visible !important;" width="172" _width="172px" src="http://mmbiz.qpic.cn/mmbiz_jpg/wawESWMb3rDJVDVkYdxTMc3MgicPUSTK5jv1Z9NqKLKXoiagakgKWfDL97GAicSXlfRvD0ok4w7G0N6mj5OicSDBNQ/0" crossorigin="anonymous" data-fail="0"></span></p></section></section></section></section></section></section>
            `,
            content_source_url: 'http://121.196.212.213/template/index.html',

        },
        thrid = {
            title: '卖萌篇：我萌我骄傲',
            thumb_media_id: '9Jq0DLU5kdSzRies2N5MfSt5gR9BulHbkOTDp40aOlk',
            author: 'DGJ',
            digest: '我萌我骄傲',
            show_cover_pic: 0,
            content: `hahah`,
            content_source_url: 'http://121.196.212.213/template/index.html',

        },
        frou = {
            title: '成长篇：吃的是奶，长的是肉',
            thumb_media_id: '9Jq0DLU5kdSzRies2N5MfbUuWQuPx9oFWMVv1WffFlI',
            author: 'DGJ',
            digest: '吃的是奶，长的是肉',
            show_cover_pic: 0,
            content: `hahah`,
            content_source_url: 'http://121.196.212.213/template/index.html',

        },
        five = {
            title: '颜值巅峰：总有那么几天感觉特别漂亮',
            thumb_media_id: '9Jq0DLU5kdSzRies2N5MfRjT6d_5GB3zAxD6LRPsfqQ',
            author: 'DGJ',
            digest: '总有那么几天感觉特别漂亮',
            show_cover_pic: 0,
            content: `hhhaaha`,
            content_source_url: 'http://121.196.212.213/template/index.html',

        }


    let reqInfo = {
        url: url,
        method: 'POST',
        json: true,
        body: {
            media_id: '9Jq0DLU5kdSzRies2N5MfarbykATKw0UyA2-O0njfmQ',
            index: 1,
            articles: two
        }
    }
    request(reqInfo, (err, resp, body) => {
        console.log('结果：', err, resp, body)
        // 9Jq0DLU5kdSzRies2N5MfSCyRRC_QFaSa5c5Mnkkme4 不知道怎么用，有点尴尬
    })

}

updateNews()
// console.log(e('haha'))
// a()

// 9Jq0DLU5kdSzRies2N5MfarbykATKw0UyA2-O0njfmQ