/*
 *	Created By gOps132
 *	12/30/2020 11:46PM
 */


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
						name: "[name].[ext]",
						outputPath: "assets"
					},
				}
			}
        ],
	}
}