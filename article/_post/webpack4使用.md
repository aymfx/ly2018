---
title: webpack4使用
date: 2018-06-05 10:37:51
categories: 技术
tags: webpack
---
![what-is-webpack.png](http://img.aymfx.cn/aymfx/2018/06/webpack.png)

## 前言 

> 现在打算花一周时间把webpack研究下，虽然之前也花了不少力气学习，这次要通读下webpack官网，顺便学习一下webpack4的新特性，内容会有点枯燥，可能看不懂，但是也要多读啊

### 简单概念

> 这里有几个比较重要的概念 先理解下  Entry、Output、Loaders、Plugins


#### 入口 Entry
> 入口起点指示webpack从哪里开始构建模块，从入口起点开始，webpack会找出其中的模块与库之间的关系，可能是直接的也可能是间接的
 - webpack一般默认的入口文件一般是 ./src/index.js
 - 当然我们也可以在webpack.congfig.js 配置
``` javascript
 module.exports = {
     entry:'.src/main.js'
 }
```

> 入口文件可以是一个也可以是多个，还有对象语法
 - 单个入口<strong>entry: string|Array<string></strong>
    - 字符串时，同上
    - 数组时，将多个文件打包到一起，按顺序
``` javascript
const path = require('path') //用于操作文件路径
module.exports = {
    mode:'production',
    entry:['./src/index.js','./src/main.js'],
    output:{
        path:path.resolve(__dirname,'dist'), //输出的文件夹
        filename:'bundle.js' //文件名
    }
}
```
 - 对象语法 entry: {[entryChunkName: string]: string|Array<string>}
   - 其实这个多入口写法
``` javascript
const path = require('path') //用于操作文件路径
module.exports = {
    mode:'production',
    entry:{
        app:'./src/index.js', //app就是名字，后面就是路径
        vender:'./src/main.js'
    },
    output:{
        path:path.resolve(__dirname,'dist'), //输出的文件夹
        filename:'bundle.js' //文件名
    }
}
```
> 上面的写法会报错

![what-is-webpack.png](http://img.aymfx.cn/aymfx/2018/06/20180605160919.png)
> 我们还需要指定每个文件出口文件，也是多入口的

```javascript
const path = require('path') //用于操作文件路径
module.exports = {
    ...
    output:{
        path:path.resolve(__dirname,'dist'), //输出的文件夹
        filename:'[name]bundle.js' //文件名 加这个name name就是输入文件的name
    }
}

```


#### 出口 Output
> 出口属性指示webpack在哪里输出它所创建的bundles，以及如何命名这些文件，所有有依赖关系的文件在编译后都会输出到你指定的输出文件夹里面
 - webpack一般默认的出口文件一般是 ./dist/main.js
 - webpack.congfig.js 配置
 ``` javascript
 const path = require('path') //用于操作文件路径
 module.exports = {
     entry:'.src/main.js',
     output:{
         path:path.resolve(___dirname,'dist'), //输出的文件夹
         filename:'bundle.js' //文件名
     }
 }
```
### Loaders 
> webpack只能处理js文件，通过loader我们可以将其他文件类型转换成webpack可以处理的文件
 - test 属性通过正则来识别需要loader处理的文件
 - use 使用哪个loader来处理这个文件

``` javascript
 const path = require('path') //用于操作文件路径
 module.exports = {
     entry:'.src/main.js',
     output:{
         path:path.resolve(___dirname,'dist'), //输出的文件夹
         filename:'bundle.js' //文件名
     },
     module:{
         rules:[
             {
                 test:/\.txt$/,
                 use:'raw-loader'
             }
         ]
     }
 }
```
> 我们还可以配置多个loader处理同一个文件，使得文件更加‘干净’,便于我们更好的操作
 
``` javascript

module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  }

```
> loder使用还有其他两种方法
 - 内联:在需要导入其他文件的地方加入loder,通过前置所有规则及使用 !，可以对应覆盖到配置中的任意 loader。
``` javascript
import Styles from 'style-loader!css-loader?modules!./styles.css';

```
 - CLI
``` vim
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```




### 插件(plugins) 
> loader被用于转换某些文件，而插件则是用于更广泛的任务，如常用的热启动，打包优化，压缩，以及注入环境变量
 - 通过require()来引入插件，并且增加一个插件的数组，插件可以被多次使用，于是我们可以通过new来实现，同事也可以通过选项进行配置
``` javascript
 const path = require('path') //用于操作文件路径
 const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件
 module.exports = {
     entry:'.src/main.js',
     output:{
         path:path.resolve(___dirname,'dist'), //输出的文件夹
         filename:'bundle.js' //文件名
     },
     module:{
         rules:[
             {
                 test:/\.txt$/,
                 use:'raw-loader'
             }
         ]
     },
     plugins:[
         new HtmlWebpackPlugin({
             template:'/src/index.html'
         })
     ]

 }
```

#### mode
> 通过这个来区分生产环境和开发环境，在webpack4通过配置这个可以在生产环境自动进行压缩优化
 - production 生产环境
 - development 开发环境

``` javascript
 const path = require('path') //用于操作文件路径
 const HtmlWebpackPlugin = require('html-webpack-plugin'); //引入插件
 module.exports = {
     mode:'development'
     entry:'.src/main.js',
     output:{
         path:path.resolve(___dirname,'dist'), //输出的文件夹
         filename:'bundle.js' //文件名
     },
     module:{
         rules:[
             {
                 test:/\.txt$/,
                 use:'raw-loader'
             }
         ]
     },
     plugins:[
         new HtmlWebpackPlugin({
             template:'/src/index.html'
         })
     ]

 }
```
### 兼容性问题

> 兼容所有es5的浏览器，不支持ie8一下的浏览器，官网提供补丁间接支持以下浏览器





