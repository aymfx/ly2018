const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[hash]bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]

        },{
            test:/\.(png|svg|jpg|gif)$/,
            use:[
                'url-loader'
            ]
        },{
            test:/\.(png|svg|jpg|gif)$/,
            use:[
                'url-loader'
            ]
        }]
    },
    plugins:[
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title:'改变世界'
        })
    ]
}

