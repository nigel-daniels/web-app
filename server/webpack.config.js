/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
var nodeExternals = require('webpack-node-externals');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: 		__dirname,

	mode:			'development',

	entry:      	'./index.js',

	output: {
		filename:	'server.js',
		path:        __dirname + '/../dist'
	},

	devtool:		'source-map',

	resolve: {
		extensions: ['.js', '.json'],
		modules: 	['./', 'node_modules']
	},

	module: {
		rules:[
			{ enforce: 'pre', test: /\.js?$/, loader: 'source-map-loader'},
			{ test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/},
		]
	},

	target: 		'node',

	node: {
		__dirname: false,
		__filename: false
	},

	externals:		[nodeExternals()],

	watch:			true,

	watchOptions: {
		ignored: /node_modules/
	},

	plugins: [
		new CopyWebpackPlugin([
			{from:	'node_modules',	to:	'../dist/node_modules'},
			{from: 	'views',		to: '../dist/views'},
			{from:	'images', 		to: '../dist/images'},
			{from:	'keys',			to:	'../dist/keys'}
		])
	]
};
