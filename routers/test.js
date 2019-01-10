

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
    let img = 'http://mmbiz.qpic.cn/mmbiz_jpg/UWb6Bewgh97Xp3iakr2dSBZKJWNDJPNlTaX5VECicTflW6T2VfkwOEUoYzF7LicqgfW55tc32pPZJRlV2YdmVQJDA/0'
    let url = 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=' + '17_rpL8s9LavCWxblou6LNUpvRfUOFpKcQGv3CwG2w9SrFlas3ey4hYdz4Ecs2NnPm6UyDQRSVnr4evRBn7J8bIZgVCn-50dLYGrJxyU_y9fa8Qc2oCitwcgDkuhPv_cs-fMR3SEb0YmJrihEjRFPMcAAAVFC'

    let reqInfo = {
        url: url,
        method: 'POST',
        json: true,
        body: {
            articles: [
                {
                    title: 'hahaha',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5MfRPwSQ1PnAp8nK4y4btmAKM',
                    author: 'DGJ',
                    digest: '测试威信永久素材，没有打错字，预防屏蔽用的',
                    show_cover_pic: 1,
                    content: '今天带了下妈妈的兔耳朵，看我眼睛亮不亮，哈哈哈哈哈',
                    content_source_url: 'http://121.196.212.213/15023/index.html',

                },
                {
                    title: 'hehehe2',
                    thumb_media_id: '9Jq0DLU5kdSzRies2N5MfRPwSQ1PnAp8nK4y4btmAKM',
                    author: 'DGJ',
                    digest: '测试多个图片素材到底是什么',
                    show_cover_pic: 1,
                    content: `<p style="max-width: 100%;min-height: 1em;white-space: pre-wrap;text-align: center;line-height: 25px;"><img class="" data-copyright="0" data-ratio="1" data-s="300,640" data-src="http://mmbiz.qpic.cn/mmbiz_jpg/UWb6Bewgh97Xp3iakr2dSBZKJWNDJPNlTaX5VECicTflW6T2VfkwOEUoYzF7LicqgfW55tc32pPZJRlV2YdmVQJDA/0" data-type="jpeg" data-w="258" style="letter-spacing: 0px; visibility: visible !important; width: 258px !important; height: auto !important;" _width="258px" src="http://mmbiz.qpic.cn/mmbiz_jpg/UWb6Bewgh97Xp3iakr2dSBZKJWNDJPNlTaX5VECicTflW6T2VfkwOEUoYzF7LicqgfW55tc32pPZJRlV2YdmVQJDA/0" crossorigin="anonymous" data-fail="0"></p>
                    <p style="text-align: center;line-height: 2em;letter-spacing: 2px;"><span style="font-size: 14px;">今天带了下妈妈的兔耳朵，看我眼睛亮不亮，哈哈哈哈哈</span></p>`,
                    content_source_url: 'http://121.196.212.213/15023/index.html',

                }
            ]
        }
    }

    request(reqInfo, (err, resp, body) => {
        console.log('结果：', err, resp, body)
        // 9Jq0DLU5kdSzRies2N5MfSCyRRC_QFaSa5c5Mnkkme4 不知道怎么用，有点尴尬
    })
}

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


// console.log(e('haha'))
a()