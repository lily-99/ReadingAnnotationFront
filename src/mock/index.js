const Mock = require("mockjs");
let data = Mock.mock({
    "data|6": [ //生成6条数据 数组
        {
            "pic": "@Image('100x40','#c33', '#ffff','11')",
            "name": "@cname",
            'pro1|0-100': 90,
            'pro2|0-100': 90,
            'pro3|0-100': 90,
        }
    ]
})
Mock.mock(/groups/, 'post', () => { //三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
    return data
})