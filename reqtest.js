var express = require('express');
var app = express();
var http = require('http');

//express设置
app.set('port', 1972);
app.use(express.static(__dirname + '/public'));

//region atdo express@3.17.5
//app.use(express.logger('dev'));
//app.use(express.bodyParser({uploadDir: __dirname + '/uploads'}));
//app.use(express.methodOverride());
//
//app.use(express.json());
//app.use(express.cookieParser('my secret here'));
//app.use(express.cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));//必须位于app.use(app.router);前
//app.use(app.router);
//endregion


//region atdo express@4.10.2
var morgan = require('morgan'); //logger模块的这个新名字真是神奇
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');

app.use(morgan('dev')); //app.use(express.logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    keys: ['key1', 'key2']
}));

////app.use(app.router); //4.0 注释掉
//endregion



//atdo 视图
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//atdo ejs-locals Express 3.x layout, partial and block template functions for the EJS template engine.
var ejslocal = require('ejs-locals');
app.engine('html', ejslocal);
var partial = require('express-partial');
app.use(partial());
app.get('/partials', function (req, res) {
    res.renderPartials({
        hello: { data: 'for hello template' },
        world: { data: 'for world template' }
    });
});


//require('atu').init(app);

app.get('/', function (req, res) {
    res.redirect('/g?p=index');
});
app.get('/g', get);

app.post('/p', post);


function post(req, res) {
    res.send('hello post');
}
function get(req, res) {
    var page = req.query.p;
    if (page) {
        res.render('index', {title: 'test', layout: null});
    } else {
        res.send('hello get');
    }
}


//atdo 4.0 以后 放到 app.get, app.post 后面
//在路由之后执行
//app.use(function (req, res, next) {
//    res.end(viewTimes(req) + ' views');
//});
//function viewTimes(req) {
//    var n = req.session.views || 0;
//    req.session.views = ++n;
//    return req.session.views;
//}



//atdo 141118 controller 的试用
var expressController = require('express-controller');
//Tell expressControllers to use the controllers-directory, and use bind() to set up routing.
expressController.setDirectory(__dirname + '/controllers').bind(app);










http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});