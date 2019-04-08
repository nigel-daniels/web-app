/**
 * Copyright 2018 Initiate Thinking (https://www.initiatethinking.com)
 * Author: Nigel Daniels
 * MIT Licensed
 */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: 		__dirname,

	mode:			'development',

	entry:      	[
		'core-js/modules/es6.promise',
		'core-js/modules/es6.array.iterator',
		'index.jsx'
	],

	output:	{
		filename:	'client.js',
		path:        __dirname + '/../dist/public'
	},

	devtool:		'source-map',

	plugins: 		[
		new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery' }),
		new CopyWebpackPlugin([{from: 'images', to: 'images'}])
	],

	resolve: {
		extensions: ['.jsx', '.js', '.json'],
		modules: 	['./', 'node_modules']
	},

	module: {
		rules:	[
			{ enforce: 'pre', test: /\.jsx$/, loader: 'source-map-loader'},
			{test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
			{ test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/},//, options: {presets: ['@babel/env']}},
			{ test: /\.css$/, loader: 'style-loader!css-loader'},
			{ test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/, loader: 'file-loader' },
			{ test: /\.(png|jpg|gif)$/, loader: 'file-loader' }
		]
	},

	watch:			true,

	watchOptions:	{
		ignored: /node_modules/
	}
};
