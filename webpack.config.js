const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

// const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
// var public_css = new ExtractTextWebpackPlugin("public.css");

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'), 
		filename: 'main.js'
	},
	module: {
    rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
    	],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'}),
	]
}