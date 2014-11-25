var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'req_test',
    multipleStatements: true
});

//atdo 0922 本地测试用
//exports.conn = mysql.createConnection({
//    host: 'localhost',
//    user: 'root',
//    password: 'root',
//    database: 'qiv',
//    multipleStatements: true
//});

var async = require('async');

//atdo req 请求； res 返回
exports.at_dothings = function (req, res) {
    var query = req.query;
    var rst = {};
    var sql = '';
    if (query.table == 'user_expend' && query.a == 'marketingeffects') {
        async.auto({
            truncate: function (callback) {
                conn.query("truncate table user_expend", function (err, result) {
                    callback(err, result);
                });
            },
            addData: ['truncate', function (callback) {
                sql = "insert into user_expend set ?";
                conn.beginTransaction();
                for (var i = 1; i <= 200; i++) {
                    var num1 = new Number(Math.random() * 100).toFixed(0);
                    var num2 = new Number(Math.random() * 100).toFixed(0);
                    var d = new Date();
                    d.setDate(num2 % 16 + 1);
                    var row = {
                        id: i,
                        corpId: '864101149000387',
                        type: num1 % 2 + 1,
                        traffic: 30,
                        additional: 0,
                        //                        month: 20140900 + (num2 % 16 + 1),
                        month: 201409,
                        //                        createtime: Date.now()
                        createtime: d.getTime()
                    };
                    conn.query(sql, row);
                }
                conn.commit(function (err, result) {
                    callback(err, result);
                });
            }]
        }, function (err, results) {
            res.send(results)
        });
    }
    else if (query.table == 'user_expend' && query.a == 'trafficreward') {
        async.auto({
            truncate: function (callback) {
                conn.query("truncate table user_expend", function (err, result) {
                    callback(err, result);
                });
            },
            addData: ['truncate', function (callback) {
                //atdo 0918
                //id 用户id 1-50
                //month 201306-201409 201305月开始 16
                //traffic 10-40

                sql = "insert into user_expend set ?";
                conn.beginTransaction();
                for (var i = 1; i <= 2000; i++) {
                    //                    var idRand = new Number(Math.random() * 50).toFixed(0) + 1;
                    var idRand = parseInt(Math.random() * 50) + 1;
                    var monthRand = parseInt(Math.random() * 16) + 1;
                    var trafficRand = parseInt(Math.random() * 30) + 1;

                    var num1 = parseInt(Math.random() * 100);

                    var month = '';
                    if (monthRand > 7) {
                        month = 2014 + '0' + (monthRand - 7);
                    } else {
                        if ((monthRand + 5) > 9) {
                            month = 2013 + '' + (monthRand + 5);
                        } else {
                            month = 2013 + '0' + (monthRand + 5);
                        }
                    }

                    var row = {
                        id: idRand,
                        corpId: '864101149000387',
                        type: num1 % 3 + 1,
                        traffic: 10 + trafficRand,
                        additional: 0,
                        month: month,
                        createtime: Date.now()
                    };
                    conn.query(sql, row);
                }
                conn.commit(function (err, result) {
                    callback(err, result);
                });
            }]
        }, function (err, results) {
            res.send(results)
        });
    }
};
