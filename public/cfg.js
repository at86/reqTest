var servers = {};

servers.webphone = {};
servers.webphone.url = 'http://localhost:43004/';
servers.webphone.reqs = {
    'marketingeffects': {
        type: 'get',
        media: '页面',
        desc: '企业营销效果',
        params: {corpId: '864101149000387', 'month': '201410'},
        params_valid: {
            'corpId': {'isInt': '', 'toInt': ''},
            'month': {'isLength': [6, 6], 'isInt': '', 'toInt': ''}
        },
        writer: '岸涛，金龙'
    },
    'gift/survey': {
        type: 'get',
        media: '页面',
        desc: '问卷调查 获取',
        params: {token: '187ec7df114b4bc7a1dac6e0a1c20a4b', 'giftid': '1000006'},
        params_valid: {
            'token': {'isLength': [32, 32]},
            'giftId': {'isInt': '', 'toInt': ''}
        },
        writer: '岸涛，金龙'
    },
    'web/wjdc/submit': {
        type: 'post',
        media: 'json',
        desc: '问卷调查 提交 todo  submitData',
        params: {token: '187ec7df114b4bc7a1dac6e0a1c20a4b', 'sId': '1000006', d: {}},
        params_valid: {
            'token': {'isLength': [32, 32]},
            'giftId': {'isInt': '', 'toInt': ''}
        },
        writer: '岸涛，金龙'
    }
};


servers.crm = {};
servers.crm.url = 'http://localhost:53013/';
servers.crm.reqs = {
    'trafficreward': {
        type: 'get',
        desc: '流量奖励',
        params: [
            {
                media: '页面',
                desc: "手机第一次请求",
                param: {token: '187ec7df114b4bc7a1dac6e0a1c20a4b'}
            },
            {
                media: 'json',
                desc: "页面下滑的更多请求",
                param: {token: '187ec7df114b4bc7a1dac6e0a1c20a4b', t: 'ajax', 'month': '201410'}
            },
            {
                media: 'json',
                desc: "单月流量奖励的详情",
                param: {token: '187ec7df114b4bc7a1dac6e0a1c20a4b', t: 'ajax', 'month': '201410', what: 'detail'}
            },
        ],
        params_valid: {
            'corpId': {'isInt': '', 'toInt': ''},
            'month': {'isLength': [6, 6], 'isInt': '', 'toInt': ''}
        },
        writer: '岸涛'
    }
};


servers.webassistant = {};
servers.webassistant.url = 'http://localhost:53001/';
servers.webassistant.reqs = {
    'subs/setcategory': {
        type: 'post',
        media: 'json',
        desc: '设置客户的分类',
        params: {
            token: '187ec7df114b4bc7a1dac6e0a1c20a4b',
            'corpId': '864101149000387',
            subscribers: [{id: '60000013345', name: "哈哈哈"}],
            categoryIds: [89]
        },
        params_valid: {
            'corpId': {'isInt': '', 'toInt': ''},
            'month': {'isLength': [6, 6], 'isInt': '', 'toInt': ''}
        },
        writer: '金龙'
    },
    'set/savecorpset_info': {
        type: 'post',
        media: 'json',
        desc: '企业信息设置',
        params: {
            "logopath": "http://cdn.35918.cn/filecdn/864101149000387/23058-1ez2ba2.thumb.png",
            "corpname": "河南点金CRM测试企业",
            "shortname": "CRM测试企业",
            "linkman": "贺永胜",
            "linkmobile": "15036076512",
            "summary": "sfsdf"
        },
        params_valid: {
            'corpId': {'isInt': '', 'toInt': ''},
            'month': {'isLength': [6, 6], 'isInt': '', 'toInt': ''}
        },
        writer: ''
    },
    'set/savecorpset_data': {
        type: 'post',
        media: 'json',
        desc: '企业数据设置',
        params: {
            "groupMaxNumber": "40",
            "addrLongitude": "117.185",
            "addrLatitude": "39.1142",
            "addrInfo": "河南省, 郑州市, 金水区",
            "province": "41",
            "city": "4101",
            "district": "410105",
            "landmark": "410105001",
            "scope": "[1004,1005]",
            "chatSwitch": 0,
            "phoneSwitch": 0
        },
        params_valid: {
            'corpId': {'isInt': '', 'toInt': ''},
            'month': {'isLength': [6, 6], 'isInt': '', 'toInt': ''}
        },
        writer: ''
    }
};

