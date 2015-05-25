function getToken(id) {
    return {'token': id};
}

module.exports = {
    // /ws
    get_index: function (req, res) {
        res.send("Hello!");
    },

    // /ws/common/handler
    post_common_handler: function (req, res) {
        var req_obj = {
            media: 'json',
            desc: '用户公共更新操作',
            params: {corpId: '864101149000387', 'month': '201410'},
            params_valid: {
                corpId: {isInt: '', toInt: ''},
                month: {isLength: [6, 6], isInt: '', toInt: ''}
            },
            writer: ''
        };
        res.send("A post 55555555555555555555555555555555555");
    }
};