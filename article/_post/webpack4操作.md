---
title: webpack4操作
date: 2018-06-06 10:37:51
categories: 技术
tags: webpack
---
![what-is-webpack.png](http://img.aymfx.cn/aymfx/2018/06/2018-06-06.jpg)

## 前言
> 现在开始操作一波了，写了点理论的，该动手留点代码的印记了，嘿嘿

### 装webpack依赖

> 打开命令行工具 **cmd or gitbash**

> 创建一个一个文件夹 

``` vim
mkdir webapck4  

```

> 进入文件夹

``` vim
cd webapck4

```
> 创建package.json

``` vim
 npm init -y
```
> 安装webpack依赖

``` vim
 npm install webpack webpack-cli --save-dev
```
> 好的，我们把项目放入编辑器来操作吧

>在当前目录下创建

``` vim
-webpack4
--package.json
--src
---index.js 
```

> index.js

``` javascript
//index.js

console.log('我是index');

```
> 运行 npx webapck,生成了一个输出目录dist
``` vim
-webpack4
--package.json
--src
---index.js
--dist
---main.js
```
> 删除dist,创建webpack.config.js 配置文件
``` vim
-webpack4
--package.json
--src
---index.js
--webpack.config.js
```
> webpack.config.js

``` javascript
const path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle.js'
    }
}
```
> 在运行 npx webpack
``` vim
-webpack4
--package.json
--src
---index.js
--webpack.config.js
--build
---bundle.js
```
> 方便起见，我们把命令行放在package.json的scripts

``` json

{
  "name": "demos",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"webpack --config webpack.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.11.1",
    "webpack-cli": "^3.0.2"
  }
}

```
> 运行 npm start 效果和之前一样

> 我们增加一个HTML
``` vim
-webpack4
--package.json
--src
---index.js
--webpack.config.js
--build
---bundle.js
---index.html
```

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <script src="./bundle.js"></script>
    
</body>
</html>

```

> 修改 index.js

``` javascript
import _ from 'lodash';
function component(){
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'ly'], ' ');
    return element;
}
document.body.appendChild(component());
```

> 安装 npm install --save lodash

> 运行 npm start 打开index.html 在浏览器，可以看到hello ly

#### 下一篇介绍loader














