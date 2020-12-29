var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

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
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
    	],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'})	
	]
}	