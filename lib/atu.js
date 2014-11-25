//region
global.atu = {};
atu.logTimes = 0;

atu.date = {};
atu.date.getLastDay = function (year, month) {
    var new_year = year;    //取当前的年份
    var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
    if (month > 12)            //如果当前大于12月，则年份转到下一年
    {
        new_month -= 12;        //月份减
        new_year++;            //年份增
    }
    // var new_date = new Date(new_year, new_month, 1);                //取当年当月中的第一天
    // return (new Date(new_date.getTime() - 1000 * 60 * 60 * 24)).getDate();//获取当月最后一天日期
    var new_date = new Date(new_year, new_month, 0);// 得到的日期是"xx"月的前一个 月的最后一天
    return new_date.getDate();
};

atu.o = new atMakeLog().create();
atu.out = atu.o.info;
//atu.log = atu.o.info;
//atu.o.info({a:23});
//atu.o.debug('debug msg');
//atu.o.warning('warning msg');
//atu.o.error('error msg');
//atu.o.trace('trace msg');
function atMakeLog() {
    var fs = require('fs');
    //linux
    //var cwd = process.cwd() + '/',
    var cwd = process.cwd(),
        INFO = 0,
        DEBUG = 1,
        WARNING = 2,
        ERROR = 3,
        TRACE = 4,
        INIT = 6,
        type = ['INFO', 'DEBUG', 'WARNING', 'ERROR', 'TRACE', '', 'LOG_INIT'],
        colors = [38, 34, 35, 31, 32, 36, 33],
        bufferSize = 20000,
        writeSize = 16384;

    function getPos() {
        try {
            throw new Error();
        } catch (e) {
            var cntRows = e.stack.split('\n');
            if (cntRows) {
                if (cntRows[4].split('(')[1]) {
                    var pos = cntRows[4].split('(')[1].split(')')[0];
                    return '    at ' + pos;
                }
                return cntRows[4];
            }
        }
    }

    function pad2(num) {
        return num > 9 ? num : '0' + num;
    }

    function getTime() {
        var t = new Date();
        return [pad2(t.getHours()), ':', pad2(t.getMinutes()), ':', pad2(t.getSeconds())].join('');
    }

    function formatLog(log, color) {
        var tag = '';
        var head = '';
        var foot = '';
        if (color) {
            head = '\x1B[';
            foot = '\x1B[0m';
            tag = colors[5] + 'm';
            color = colors[log.type] + 'm';
        }
        return [log.time, log.pos, '[', head, tag, log.pos, foot, '] '].join('');
    }

    this.create = function (level, file) {
        if (!level) {
            level = INFO;
        }
        if (file) {
            var buffer = new Buffer(bufferSize);
            var pos = 0;
            var fd = fs.openSync(file, 'a');
            process.on('exit', function () {
                fs.writeSync(fd, buffer, 0, pos, null);
            })
        }
        function log(type, msg) {
            if (type < level) {
                return;
            }

            var log = {type: type, time: getTime(), pos: getPos()};
            console.log(getTime() + ' ========================');
            console.log(getPos());

            for (var i = 0; i < msg.length; i++) {
                //console.log(JSON.stringify(msg[i]));
                console.log(msg[i]);
            }
            console.log();
            if (file) {
                if (pos >= writeSize) {
                    fs.writeSync(fd, buffer, 0, pos, null);
                    pos = 0;
                }
                pos += buffer.write(formatLog(log) + "\r\n", pos);
            }
        }

        return {
            log: function () {
                log(INFO, arguments);
            },
            info: function () {
                log(INFO, arguments);
            },
            debug: function (msg) {
                log(DEBUG, msg);
            },
            warning: function (msg) {
                log(WARNING, msg);
            },
            error: function (msg) {
                log(ERROR, msg);
            },
            trace: function (msg) {
                log(TRACE, msg);
            }
        };
    }
}

//endregion