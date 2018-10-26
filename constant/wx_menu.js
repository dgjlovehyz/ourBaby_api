'use strict'

module.exports = {
    menuCreate: {
        "button": [
            {
                "name": "宝贝管理",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "添加宝贝",
                        "key": "baby_add",
                    },
                    {
                        "type": "click",
                        "name": "关联宝贝",
                        "key": "baby_relation",
                    },
                    {
                        "type": "click",
                        "name": "查询宝贝",
                        "key": "baby_search"
                    }]
            },
            {
                "name": "添加照片",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "照骗",
                        "key": "baby_pictre"
                    },
                    {
                        "type": "click",
                        "name": "不知道填什么了",
                        "key": "baby_nothing"
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD"
                    }]
            }]
    }
}