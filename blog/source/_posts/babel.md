---
title: babel
date: 2017-08-23 14:02:02
tags: babel
---
# 什么是es5

>Babel是一个转码器，可以将es6的代码转换成es5，以下参照阮一峰大神的博客


# 举个例子

> 箭头函数

``` javascript

//es6
var sum = (a,b) => (a+b)

//转成es5

var sum = function(a,b){
    return a+b
}

```

# 配置文件 .babelrc

>Babel 的配置文件是.babelrc，存放在项目的根目录下。使用 Babel 的第一步，就是配置这个文件用，用来设置转码规则和插件。

>基本格式如下

``` javascript

    {
      "presets": [],
      "plugins": []
    }

```

>presets字段用于设置转码规则

``` bash
    //cnpm 我装了淘宝镜像，npm 也行的
    # 最新转码规则
        cnpm install --save-dev babel-preset-latest

    # react 转码规则
        cnpm install --save-dev babel-preset-react

    # 不同阶段语法提案的转码规则（共有4个阶段），选装一个
        cnpm install --save-dev babel-preset-stage-0
        cnpm install --save-dev babel-preset-stage-1
        cnpm install --save-dev babel-preset-stage-2
        cnpm install --save-dev babel-preset-stage-3
```

``` javascript

    //.babelrc 配置
    {
    "presets": [
      "latest",
      "react",
      "stage-2"
    ],
    "plugins": []
  }

```

# 命令行转码babel-cli 全局安装

``` bash
    npm install --global babel-cli
```

> 基本用法

``` bash

    # 转码结果输出到标准输出
    $ babel example.js

    # 转码结果写入一个文件
    # --out-file 或 -o 参数指定输出文件
    $ babel example.js --out-file compiled.js
    # 或者
    $ babel example.js -o compiled.js

    # 整个目录转码
    # --out-dir 或 -d 参数指定输出目录
    $ babel src --out-dir lib
    # 或者
    $ babel src -d lib

    # -s 参数生成source map文件
    $ babel src -d lib -s
```

>上面代码是在全局环境下，进行 Babel 转码。这意味着，如果项目要运行，全局环境必须有 Babel，也就是说项目产生了对环境的依赖。另一方面，这样做也无法支持不同项目使用不同版本的 Babel


# 安装在项目中

``` bash
    # 安装
    $ npm install --save-dev babel-cli
```

>改写package.json 

``` javascript 

    {
      // ...
      "devDependencies": {
        "babel-cli": "^6.0.0"
      },
      "scripts": {
        "build": "babel src -d lib"
      },
    }

````

> 运行
``` bash
 $ npm run build

```




