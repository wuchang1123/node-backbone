var path = require('path'),
	fs = require('fs'),
	_exists = fs.existsSync || path.existsSync,
	_slice = Array.prototype.slice;

var libPath = __dirname;
var rootPath = libPath.replace(/(\/|\\)lib.*/, '');
var lessPath = path.join(rootPath, "lib", "less");
var lessc = require(rootPath + '/node_modules/less/lib/less/index.js');

var makeLessPar = function() {
	return new(lessc.Parser)({
		paths: [lessPath]
	});
};
var tocss = function(str, callback) {
	var lessparser = makeLessPar();
	//var str = fs.readFileSync(lessurl, 'utf8');
	lessparser.parse(str, function (e, root) {
		callback(e, root && root.toCSS && root.toCSS({
			//compress: true
		}));
	});
};

module.exports = function() {
	var str, css;
	var args = _slice.call(arguments),
		name = path.join.apply(null, _slice.call(args, 1)),
		res = arguments[0],
		file = path.join(lessPath, name + ".less");
	css = '@import "./' + name +'";';
	if (css) {
		tocss(css, function(e, cbcss) {
			res.type('text/css;charset=utf-8');
			res.send(e ? "" : cbcss);
		});
	} else {	
		res.type('text/css;charset=utf-8');
		res.send("");
	}
}