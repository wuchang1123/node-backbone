var libPath = __dirname;
var rootPath = libPath.replace(/(\/|\\)lib/, '');
var path = require('path'),
	fs = require('fs'),
	_exists = fs.existsSync || path.existsSync,
	_slice = Array.prototype.slice;

module.exports = function() {
	var str, json;
	var name = path.join.apply(null, _slice.call(arguments));
	//console.log(name);
	var jsonfile = path.join(rootPath, "lib", "data", name + ".json");
	str = _exists(jsonfile) ? fs.readFileSync(jsonfile).toString() : "";
	json = str ? JSON.parse(str) : {};
	return json;
};