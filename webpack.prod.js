//FIXME: webp erased from clean webpack plugin

const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// (async () => {
// 	const img = await imagemin([
// 			path.resolve(__dirname, './src/assets/img/*/*.{jpg,jpeg,png,webp}').replace(/\\/g, '/')], 
// 	{
// 		destination: path.resolve(__dirname, 'dist/assets').replace(/\\/g, '/'),
// 		plugins: [imageminWebp({ quality: 70 })],
// 	});

// 	console.log('Images optimized');
// 	console.log(img);
// })();

module.exports = merge(common, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'), 
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader, 					
						{
							loader: 'css-loader',
							options: {
								url: true,
							},
						},
					],
				},
			],
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new OptimizeCssAssetsPlugin(),
		new TerserPlugin(),
		new HtmlWebpackPlugin({
		template: './src/index.html',
			filename: 'index.html',
			minify: {
				removeAttributeQuotes: true,
				collapseWhitespace: true,
				removeComments: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: "[hash].css",
			chunkFilename: "[id].css"
		}),
		new CleanWebpackPlugin(),
	],
});