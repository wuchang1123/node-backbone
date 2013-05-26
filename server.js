var express = require('express');
var app = express();
var loadJson = require('./lib/loadjson');
var lessp = require('./lib/server/less');

// simple logger
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});

// less 请求
app.get(/\/assets\/css\/(.*)\.(css|less)$/, function(req, res, next) {
	var file = req.params[0];
	var paths = file.split(/[\/\\]+/);
	lessp.apply(null, [res].concat(paths));
});

// api 服务
app.get(/\/api\/(.*)\.(json)$/, function(req, res, next) {
	var file = req.params[0].replace(/\.\.+/g, "");
	var paths = file.split(/[\/\\]+/);
	res.type('application/json; charset=utf-8');
	res.send(loadJson.apply(null, [res].concat(paths)));
});

// package.json
app.get(/package\.json$/, function(req, res, next) {
	var paths = ["..", "..", "package"];
	res.type('application/json; charset=utf-8');
	res.send(loadJson.apply(null, [res].concat(paths)));
});


// 静态文件服务
app.use(express.static(__dirname + '/public'));

app.listen(3000);