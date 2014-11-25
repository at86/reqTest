//全局函数
module.exports = {
    //测试
    getPreData: function (req, callback) {
        //var token = req.headers['x-user-token'];
        var token = '222';

        var user = {'name': 'at86'};
        user.token = token;
        callback(null, user);
    }
};