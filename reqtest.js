var express = require('express');
var app = express();
var ejslocal = require('ejs-locals');
var http = require('http');

//express设置
app.set('port', 1972);
app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser({uploadDir: __dirname + '/uploads'}));

app.use(express.cookieParser('my secret here'));
//app.use(express.cookieSession({ secret: 'tobo!', cookie: { maxAge: 60 * 60 * 1000 }}));//必须位于app.use(app.router);前
app.use(app.router);

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.engine('html', ejslocal);


//require('atu').init(app);

app.get('/', function (req, res) {
    res.redirect('/g?p=index');
});
app.get('/g', get);

app.post('/p', post);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

function post(req, res) {

}

function get(req, res) {
    var page = req.query.p;
    if (page) {
        res.render('index', {title: 'test', layout: null});
    } else {
        res.send('hello');
    }
}
