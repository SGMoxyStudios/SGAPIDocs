var util = require('util'),
    fs = require('fs'),
    path = require('path'),
    i18n=require("i18n-express"),
    express = require('express'),
    partials = require('express-partials'),
    app = express(),

    port = 16000;

// all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.cookieParser());
app.use(express.session({secret: '123456789abcdefg'}));
app.use(express.favicon());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, '/public')));

app.use(i18n({
    translationsPath: path.join(__dirname, 'translations'),
    siteLangs: ["zh-tw", "zh-cn", "zh-hk", "en"]
}));

// development only
if ('development' === app.get('env')) {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
}

//load file
var FilePath = __dirname + '/public/data/';
var Channels = [];
var ResultCode = [];

function ReloadData() {
    fs.readFile(FilePath + 'channels.json', 'utf8', function (err, data) {
        if (!err) {
            Channels = JSON.parse(data);
        } else
            console.log('Load channels error: ' + err);
    });

    fs.readFile(FilePath + 'resultcode.json', 'utf8', function (err, data) {
        if (!err) {
            ResultCode = JSON.parse(data);
        } else
            console.log('Load ResultCode error: ' + err);
    });
}

ReloadData();

app.get('/', function(req, res){res.render('index')});
app.get('/api-open', function(req, res){res.render('api-open')});
app.get('/api-verification', function(req, res){res.render('api-verification')});
app.get('/must-read', function(req, res){res.render('must-read')});
app.get('/channel', function(req, res) {
    res.render('channel', {Channels: Channels});
});
//server
app.get('/server-pay', function(req, res){res.render(req.i18n_lang+'/server-pay')});
app.get('/server-sign', function(req, res){res.render(req.i18n_lang+'/server-sign')});

//web api
app.get('/webapi-init', function(req, res){
    res.render(req.i18n_lang+'/webapi-init', {ResultCode: ResultCode})
});
app.get('/webapi-user', function(req, res){res.render(req.i18n_lang+'/webapi-user')});
app.get('/webapi-pay', function(req, res){res.render(req.i18n_lang+'/webapi-pay')});
app.get('/webapi-analytics', function(req, res){res.render(req.i18n_lang+'/webapi-analytics')});
//java
app.get('/java-init', function(req, res){res.render(req.i18n_lang+'/java-init')});
app.get('/java-user', function (req, res) { res.render(req.i18n_lang + '/java-user') });
app.get('/java-pay', function (req, res) { res.render(req.i18n_lang + '/java-pay') });
app.get('/java-analytics', function (req, res) { res.render(req.i18n_lang + '/java-analytics') });
//swift
app.get('/swift-init', function(req, res){res.render(req.i18n_lang+'/swift-init')});
app.get('/swift-user', function(req, res){res.render(req.i18n_lang+'/swift-user')});
app.get('/swift-pay', function(req, res){res.render(req.i18n_lang+'/swift-pay')});
app.get('/swift-analytics', function(req, res){res.render(req.i18n_lang+'/swift-analytics')});
//unity
app.get('/unity-init', function(req, res){res.render(req.i18n_lang+'/unity-init')});
app.get('/unity-user', function(req, res){res.render(req.i18n_lang+'/unity-user')});
app.get('/unity-pay', function(req, res){res.render(req.i18n_lang+'/unity-pay')});
app.get('/unity-analytics', function(req, res){res.render(req.i18n_lang+'/unity-analytics')});
//unity china
app.get('/unity-china-init', function(req, res){res.render(req.i18n_lang+'/unity-china-init')});
app.get('/unity-china-doc', function(req, res){res.render(req.i18n_lang+'/unity-china-doc')});

app.listen(port);
console.log('Express server listening on port ' + port);