/*
 * @作者: ly 
 * @创建时间: 2018-05-22 16:01:27 
 * @最后修改的人:   ly 
 * @最后修改的时间: 2018-05-22 16:01:27 
 */
'use strict'
const path = require('path')
const webpack = require('webpack');
const getEntry = require('./tool/getEntries');
const getHtmls = require('./tool/getHtmls');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
/**
 * @description '补全路径'
 * @param {String} dir 
 * @returns 
 */
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '../'), //以根目录作为打包路径
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, '..'),
        filename: '[name].bundle.[hash:6].js',
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.ejs$/,
            use: [
                'ejs-loader',
            ]
        }, {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'www/img/[name].[hash:7].[ext]'
                    }
                },

            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CleanWebpackPlugin(['h5', 'activity'], {
            root: path.resolve(__dirname, '../')
        }),
        // 生成manifest插件
        new ManifestPlugin({
            fileName: 'src-manifest.json',
            seed: {
                name: 'My Manifest',
            },
            path: '/',
            writeToFileEmit: true,
        }),
        ...getHtmls
    ]
}