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
                "name": "我的宝贝",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "没有绑定的宝贝哦",
                        "key": "baby_empty",
                    }
                ]
            },
            {
                "name": "帮助中心",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "如何查询宝贝的编号",
                        "key": "help_baby_uuid",
                    },
                    {
                        "type": "click",
                        "name": "每日状态说明",
                        "key": "help_day_explain",
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD",
                    }
                ]
            }]
    },
    conditionalMenu: {
        "button": [
            {
                "name": "宝贝管理",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "添加宝贝",
                        "key": "baby_add",
                        "sub_button": []
                    },
                    {
                        "type": "click",
                        "name": "关联宝贝",
                        "key": "baby_relation",
                        "sub_button": []
                    },
                    {
                        "type": "click",
                        "name": "查询宝贝",
                        "key": "baby_search",
                        "sub_button": []
                    }
                ]
            },
            {
                "name": "我的宝贝",
                "sub_button": []
            },
            {
                "name": "帮助中心",
                "sub_button": [
                    {
                        "type": "click",
                        "name": "如何查询宝贝的编号",
                        "key": "help_baby_uuid",
                        "sub_button": []
                    },
                    {
                        "type": "click",
                        "name": "每日状态说明",
                        "key": "help_day_explain",
                        "sub_button": []
                    },
                    {
                        "type": "click",
                        "name": "赞一下我们",
                        "key": "V1001_GOOD",
                        "sub_button": []
                    }
                ]
            }
        ],
        "matchrule": {
            "tag_id": undefined
        }
    },
    getTagByNum: async (num) => {
        let tagId
        switch (num) {
            case 0:
                tagId = 100;
                break;
            case 1:
                tagId = 101;
                break;
            case 2:
                tagId = 103
                break;
            case 3:
                tagId = 104
                break;
            case 4:
                tagId = 105
                break;
            case 5:
                tagId = 106
                break;
            default:
                tagId = 107
                break;
        }

        return tagId
    }
}