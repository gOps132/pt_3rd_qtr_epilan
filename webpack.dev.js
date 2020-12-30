/*
 *	Created By gOps132
 *	12/29/2020 11:46PM
 */


const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'), 
		filename: 'main.js',
		publicPath: '/',
	},
	resolve: {
		alias: { 
			Pages: path.resolve(__dirname, './src/pages/'),
			Assets: path.resolve(__dirname, './src/assets/'),
			App: path.resolve(__dirname, './src/app/'),
			CSS: path.resolve(__dirname, './src/css/'),
		},
	},
	module: {
    rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			}
    	],
	},
	plugins: [	
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: 'index.html'
		}),
	]
});