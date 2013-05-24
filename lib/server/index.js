var libPath = __dirname;
var rootPath = libPath.replace(/(\/|\\)lib/, '');
var path = require('path'),
	fs = require('fs'),
	_exists = fs.existsSync || path.existsSync,
	_slice = Array.prototype.slice;

var less = require('./less'),

module.exports = {
	less: less
};