---
title: webpack4-plugin
date: 2018-06-05 17:11:12
categories: 技术
tags: webpack
---
![what-is-webpack.png](http://img.aymfx.cn/aymfx/2018/06/webpack.png)

## 前言
> 来使用下插件,好像也没啥说的。

### HtmlWebpackPlugin
> 到目前为止，我们在 index.html 文件中手动引入所有资源，然而随着应用程序增长，并且一旦开始对文件名使用哈希(hash)]并输出多个 bundle，手动地对 index.html 文件进行管理，一切就会变得困难起来。然而，可以通过HtmlWebpackPlugin插件，会使这个过程更容易操控。

> 安装 npm install --save-dev html-webpack-plugin

> 修改webpack.config.js

``` javascript

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
        new HtmlWebpackPlugin({
            title:'改变世界'
        })
    ]
}

```

### clean-webpack-plugin

> 由于用了hash来生成目标文件，每次构建都生成新的，会很烦，我们需要及时清理构建的文件夹于是这个插件出来了

> 安装 npm install clean-webpack-plugin --save-dev

> 修改webpack.config.js

``` javascript

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

```

### 



