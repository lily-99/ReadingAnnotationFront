const Mock = require("mockjs");
let data = Mock.mock({
    "data|6": [ //生成6条数据 数组
        {
            "pic":"@Image('100x40','#c33', '#ffff','11')",
            "name":"@cname",
            'pro1|0-100':90,
            'pro2|0-100':90,
            'pro3|0-100':90,



            // "shopId|+1": 1,//生成商品id，自增1
            // "shopMsg": "@ctitle(10)", //生成商品信息，长度为10个汉字
            // "shopName": "@cname",//生成商品名 ， 都是中国人的名字
            // "shopTel": /^1(5|3|7|8)[0-9]{9}$/,//生成随机电话号
            // "shopAddress": "@county(true)", //随机生成地址
            // "shopStar|1-5": "★", //随机生成1-5个星星
            // "salesVolume|30-1000": 30, //随机生成商品价格 在30-1000之间
            // "shopLogo": "@Image('100x40','#c33', '#ffffff','小北鼻')", //生成随机图片，大小/背景色/字体颜色/文字信息
            // "food|7": [ //每个商品中再随机生成七个food
            //     {
            //         "foodName": "@cname", //food的名字
            //         "foodPic": "@Image('100x40','#c33', '#ffffff','小可爱')",//生成随机图片，大小/背景色/字体颜色/文字信息
            //         "foodPrice|1-100": 20,//生成1-100的随机数
            //         "aname|14": [
            //             { 
            //                 "aname": "@cname", 
            //                 "aprice|30-60": 20 
            //             }
            //         ]
            //     }
            // ]
        }
    ]
})
Mock.mock(/groups/, 'post', () => { //三个参数。第一个路径，第二个请求方式post/get，第三个回调，返回值
    return data
})