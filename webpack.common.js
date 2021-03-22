const dev_mode = process.env.NODE_ENV !== 'production'
const path = require('path');

// const imagemin = require('imagemin');
// const imageminWebp = require('imagemin-webp');

module.exports = {
	entry: './src/index.js',
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
				test: /\.html$/,
				use: ["html-loader"]
			},
			{
				test: /\.(svg|gif|mp3)$/,
				use: {
					loader: "file-loader",
					options: {
						publicPath: 'assets',
						name: dev_mode ? "[hash].[ext]" : "[name].ext",
						outputPath: "assets"
					},
				}
			},
			{
				test: /\.(png|jpg|jpeg|webp)$/i,
				use: [
						{
							loader: 'file-loader',
							options: {
								publicPath: 'assets',
								name: dev_mode ? "[hash].[ext]" : "[name].ext",
								outputPath: "assets",
								emitFile: true,
							},
						},
						{
							loader: 'webp-loader',
							options: {
								quality: 70,
							},
						}
					],
			},
		],
	}
}