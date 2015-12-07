'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './src/core.js',
	output: {
		filename: 'dist/bundle.js'
	},
	node: {
		fs: 'empty'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				include: path.join(__dirname, 'node_modules', 'pixi.js'),
				loader: 'json-loader',
			},
			{
				test: /\.js$/,
				exclude: path.join(__dirname, 'node_modules'),
				loader: 'babel-loader',
          query: {
        presets: ['es2015']
      }
			}
		]
	}
};
