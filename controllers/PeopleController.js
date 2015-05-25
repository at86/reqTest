function getToken(id) {
    return {'token': id};
}

module.exports = {
    /*
     Will be translated to get("/people") (first level is generated by controller name)
     */
    //http://localhost:1972/people/
    get_index: function (req, res) {
        res.send("Hello visitor!");
    },

    /*
     Will be translated to get("/people") (HTTP-method is extracted by first item in function name)
     */
    post_index: function (req, res) {
        res.send("A post");
    },

    /*
     Will be translated to get("/people/finest") (subsections automatically appended)
     */
    //http://localhost:1972/people/finest
    get_finest: function (req, res) {
        res.send("/people/finest");
    },

    /*
     Will be translated to get("/people/:id") (parameters automatically extracted from function parameters)
     */
    get_id: function (req, res, id) {
        res.send("You are requesting the resource with id: " + id);
    },

    /*
     Will be translated to get("/people/:id/friends") (if parameter is included in function-name, it will be be included in the same position)
     */
    //http://localhost:1972/people/abcd/friends
    get_id_friends: function (req, res, id) {
        res.send("You are requesting the friends of the person with id: " + id);
    },
    /*
     Will be translated to get("/people/:userName/friend-requests") (non parameter parts that use camelCase will be separated by hyphens in the url)
     */
    //http://localhost:1972/people/abcd/friend-requests
    get_userName_friendRequests: function (req, res, userName) {
        res.send("You are requesting the friend requests of the person with user name: " + userName);
    },

    //atdo 141120
    // cbof_getPreData 是需要提前调用的函数，该类函数在 /global_funs 里面定义。
    // cbof_ 是占位符，getPreData 是 /global_funs 模块里面的函数
    //http://localhost:1972/people/test-params/a/b/c/d/e
    get_testParams: function (req, res, cbof_getPreData, a, b, c, d, e) {
        //atdo 获取token，用户信息等数据；该部分通用
        //该处调用函数实现功能，使用async，缺点每个action 里面都要调用该函数
        //console.log(getToken(232));

        //console.log(req.params); // { a: 'a', b: 'b', c: 'c', d: 'd', e: 'e' }

        //var req_obj = {
        //    type: 'get',
        //    media: '页面',
        //    desc: '企业营销效果',
        //    params: {corpId: '864101149000387', 'month': '201410'},
        //    params_valid: {
        //        corpId: {isInt: '', toInt: ''},
        //        month: {isLength: [6, 6], isInt: '', toInt: ''}
        //    },
        //    writer: '岸涛，金龙'
        //};
        //console.log(a, b, c, d, e);
        res.send('how many parameters can be dealed');
    }
};