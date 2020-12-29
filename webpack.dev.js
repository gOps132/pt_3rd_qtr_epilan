/*
 *	Created By gOps132
 *	12/29/2020 11:46PM
 */


const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						// publicPath: (resourcePath, context) => {
						// 	return path.relative(path.dirname(resourcePath), context) + '/';
						// },
						name: "[hash].[ext]",
						outputPath: "assets"
					},
				}
			}
    	],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css"
		})
	]
}