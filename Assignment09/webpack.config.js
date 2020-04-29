const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry : './src/index.tsx',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: "file-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    mode:'development',
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html", filename: "index.html"
            }
        ),
        new MiniCssExtractPlugin(
            {
                filename: "[name].css",
                chunkFilename: "[id].css"
            }
        )
    ]

};
