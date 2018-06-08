---
title: node.js深入浅出笔记1
date: 2017-08-25 10:16:34
tags: node
---

# commonjs的模块定义

> 模块引用 ，模块定义 模块标识

## 模块引用

``` bash

    var math = require('math'); //require用于引用一个api模块，括号里面的称为模块标识
```

## 模块的定义

> 在node中，一个文件就是一个模块，将方法挂在到exports对象上作为属性可以导出

``` javascript
    exports.add = function(a,b){
        return a+b
    }

    //export 是唯一导出方法的方式
```

## 模块标识

> 指的就是require()中的参数

 - 核心模块 http fs path等
 - .或者..开始的相对路劲的文件模块
 - 以/开始的绝对路劲的模块
 - 非路径形式的模块文件，自定模块

# node 的模块实现

> 引入模块需要经历三个步奏 路劲定位 文件定位 编译执行

## 核心模块与用户模块的区别以及加载速度

 - 核心模块，在node启动时已经被编译好了，核心部分都写在内存，只需做路劲分析就好，加载速度最快
 - 文件模块，则是运行时动态加载，以上路径分析，文件定位，编译都要走，所以最慢呀

## 优先加载缓存

 > 核心模块，和用户模块都会被缓存，优先去取缓存的东西，顺序-->   缓存核心模块<-<-缓存用户模块<-核心模块<-用户模块
 
## 文件定位

- 扩展名分析 : 查找顺序 .js > .node > .json
- 目录分析和包 : 首先会检查包下面的package.json ,通过json.parse() 取出main属性指定文件名进行定位，如果main错误或不存在，则默认index文件名查找，还没找到就抛出异常

# 模块的编译

> module对象

``` javascript
function Module(id,parent){
    this.id = id ;
    this.exports ={};
    this.parent = parent;

    if(parent && parent.children) {
        parent.children.push(this);
    }

    this.filename = null;
    this.loaded  = false;
    this.children = [];
}
```

> 载入以及编译

 - .js 用fs模块同步读取文件后进行编译
 - .node 这是c/c++编写的扩展文件，通过dlopen()方式进行加载最后编译生成的文件
 - .json 用fs模块同步读取文件后，用JSON.parse()解析返回结果
 - 其余扩展名，都被当做.js文件载入

> 每个编译成功的模块，路劲作为索引都会缓存在Module._cache对象上_
## 举个.json的加载的例子

``` javascript
Module._extensoins[.json] = function(module,filename){
    va content = NativeModule.require('fs').readFileSync(filename,'utf-8');\
    try{
        module.exports = JSON,parse(stripBOM(content));
    } catch (err) {
        err.message = filename + ":" +err.message;
        throw err;
    }
}

//Module._extensions 会被赋值给require()的extensions属性
```

# Javascript模块的编译

> 由于模块文件实际在编译过程会被node包装，所以我们才可以调用几个常用的方法，包装后通过vm原生模块runInThisContext()方法执行（类似eval,有明确上下文，不污染全局），返回function对象

``` javascript
    
    //包装后

    (function(exports,require,module,_filename,_dirname){
         //模块内容
            
        }) 

```

# 编译核心模块
> 源文件通过process.binding('natives')取出，编译成功的模块缓存到NativeModule._cache对象上，文件模块则缓存Module.cache对象上

``` javascript

    function NativeModule(id) {
        this.filename = id + '.js';
        this.id = id;
        this.exports = {}
        this.loaded = false;
    }
    NativeModule._source = process.binding('natives');
    NativeModule._cache = {};
```

# c/c++核心模块的编译

> 由纯c/c++编写的部分统一称为内建模块，通常不被用户直接调用

> 内建模块的导出 (依赖关系)

``` javascript
    文件模块 <--- 核心模块(javascript) <---内建模块(c/c++)
```
>加载内建模块时，先创建exports空对象，然后调用get_builtin_module()方法取出内建模块对象，通过执行register_func()填充exports对象，最后将exports对象按模块名缓存，并返回给调用方完成导出

# 包与npm

> commonjs规范:前者用于组织包中的各种的文件，后者则用于描述包的相关信息，以供外部读取分析

## 包结构（符合commonjs规范）
 - package.json:包描述文件
 - bin:存放二进制文件的目录
 - lib:用于存放JavaScript代码的目录
 - doc:用于存放文档的目录
 - test:用于存放单元测试的代码

## 包描述文件（package.josn）与npm

 - 参考之前的文章

## npm常用功能

 - 查看帮助 npm -v
 - 安装依赖包 npm i package
 - 















