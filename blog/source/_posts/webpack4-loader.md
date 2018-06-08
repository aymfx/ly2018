---
title: webpack4-loader
date: 2018-06-05 14:31:26
categories: 技术
tags: webpack
---
![what-is-webpack.png](http://img.aymfx.cn/aymfx/2018/06/webpack.png)

## 前言
> 这个比较欢快点，理解起来可能比较麻烦，但是主要是给自己看的，我完全扒官网的例子，所以没必要看我的

### 加载css

> 安装 npm install --save-dev style-loader css-loader

> 修改 webpack.config.js

``` javascript

const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]

        }]
    }
}

```
> 在src/style.css 新增

``` css
html,body{
    background: #ff0;
}

```

> index.js

``` javascript
import _ from 'lodash';
import './style.css'
function component(){
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'ly'], ' ');
    return element;
}
document.body.appendChild(component());

```
### 加载图片

> 安装 npm install --save-dev file-loader url-loader

> 修改 webpack.config.js

``` javascript
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
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
        }]
    }
}
```

> 新增一张图片 src/a.jpg

> 修改 index.js

``` javascript
import _ from 'lodash';
import './style.css';
import tu from './a.jpg'
function component(){
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'ly'], ' ');
    var img = document.createElement('img');
    img.src = tu;
    element.appendChild(img);
    return element;
}
document.body.appendChild(component());
```

#### 字体也是一样的

> 修改webpack.config.js

```
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
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
    }
}


```
> 新怎 src/  my-font.woff2  my-font.woff  字体

> 修改style.css

```
 @font-face {
     font-family: 'MyFont';
     src: url('./my-font.woff2') format('woff2'), url('./my-font.woff') format('woff');
     font-weight: 600;
     font-style: normal;
 }

 html,
 body {
     background: #ff0;
     font-family: 'MyFont';
 }

```


