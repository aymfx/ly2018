---
title: webpack笔记1
date: 2018-01-10 20:10:16
tags: webpack
---

# 前言

##  ==划一划重点==

>    新的一年了，不知不觉已经踏入前端这么久了，但是技术还是没什么>长进，每天虽然忙碌着，但是基本就是停留在会用这些东西的基础上，擅>长复制粘贴，擅长解决bug,自己只会拿别人的框架组装东西，没有考虑这>东西比较深层次的东西，前端的东西变化的很快，公司业务虽然不复杂，>但是未来需要面对很多新的挑战，我需要学习更多的东西。毕业的几年应>该是学习最快的时间段，我应该更加努力了，嘿嘿。

![我爱团子](https://aymfx.github.io/img/a201801/a.jpg)

---

# 开始学习啦

## 起步

> 初始化安装一个环境,创建一个文件夹，在文件夹里面运行cmd

``` cmd
npm init -y   //建立一个package.json文件
npm i -D webpack //本地安装webpack,还可以全局安装，本地安装适合移植
    
```

### 项目目录

![目录](https://aymfx.github.io/img/a201801/a1.jpg)

> buid : 编译后的目录

> src : 源目录  需要编译的目录


``` javascript

目录结构:src/index.js
需要的依赖:cnpm i lodash -S

代码:

import _ from "lodash"; //要引入的依赖

function component() {
    var element = document.createElement('div');
    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }
  document.body.appendChild(component());

```

``` javascript

目录结构:html


代码:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    
    <title>Document</title>
</head>
<body>
    测试
    <script src="./build/index.js"></script>
</body>
</html>

```

###  编译命令

> npx webpack src/index.js build/index.js  或者 webpack src/index.js build/index.js

> 最后在build生成了打包好的文件index.js,这就是js打包，可以将有依赖关系的js文件打包在一个包里

###  配置文件编译

``` javascript
    //webpack.config.js
    const path = require("path");
    module.exports = {
    entry:'./src/index.js', // 入口文件路径
    output:{                //出口
        filename:'index.js',//出口文件名
        path:path.resolve(__dirname,'build')//输出路径
    }
}

//命令行运行 webapck,就可以编译命令了 或者用命令行指定某个配置文件 webpack --config webpack.config.js
```

### 将命令写在根目录的package.json 上


``` javascript
{
  "name": "wepack-study",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start":"wepack --config webpack.config.js"  //json不能写注释，复制后请删除， 这里写命令行
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^3.10.0"
  },
  "dependencies": {
    "lodash": "^4.17.4"
  }
}


```

> npm start   //直接可以编译

