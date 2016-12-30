var util = require('util'),
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

app.get('/', function(req, res){res.render('index')});
app.get('/api-open', function(req, res){res.render('api-open')});
app.get('/must-read', function(req, res){res.render('must-read')});
app.get('/webapi-init', function(req, res){res.render('webapi-init')});
app.get('/webapi-user', function(req, res){res.render('webapi-user')});

app.listen(port);
console.log('Express server listening on port ' + port);