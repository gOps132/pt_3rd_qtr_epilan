/*
 *	Created By gOps132
 *	12/30/2020 11:46PM
 */


const dev_mode = process.env.NODE_ENV !== 'production'
const path = require('path');

module.exports = {
	entry: './src/index.js',
	module: {
    rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
			{
				test: /\.(svg|png|jpg|gif)$/,
				use: {
					loader: "file-loader",
					options: {
						publicPath: 'assets',
						name: dev_mode ? "[hash].[ext]" : "[name].ext",
						outputPath: "assets"
					},
				}
			}
        ],
	}
}