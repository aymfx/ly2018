---
title: node.js开发指南笔记6
date: 2017-08-16 11:30:39
tags: node
---

# 模块加载机制

> 学习模块间是如何先后加载

# 模块的类型

> Node.js 的模块可以分为两大类，一类是核心模块，另一类是文件模块。核心模块就是
Node.js 标准 API 中提供的模块，如  fs 、 http 、 net 、 vm  等，这些都是由 Node.js 官方提供的模块，编译成了二进制代码。我们可以直接通过  require  获取核心模块，例如require('fs') 。核心模块拥有最高的加载优先级，换言之如果有模块与其命名冲突，Node.js 总是会加载核心模块

>文件模块则是存储为单独的文件（或文件夹）的模块，可能是 JavaScript 代码、JSON 或编译好的 C/C++ 代码。文件模块的加载方法相对复杂，但十分灵活，尤其是和 npm 结合使用时。在不显式指定文件模块扩展名的时候，Node.js 会分别试图加上 .js、.json 和 .node扩展名。.js 是 JavaScript 代码，.json 是 JSON 格式的文本，.node 是编译好的 C/C++ 代码。

# 按路径加载模块

>文件模块的加载有两种方式，一种是按路径加载，一种是查找 node_modules 文件夹。

> 如果  require 参数以“ / ”开头，那么就以绝对路径的方式查找模块名称，例如  require('/home/byvoid/module') 将会按照优先级依次尝试加载 /home/byvoid/module.js、/home/byvoid/module.json 和 /home/byvoid/module.node。

>如果 require  参数以“ ./ ”或“ ../ ”开头，那么则以相对路径的方式来查找模块，
这种方式在应用中是最常见的。例如前面的例子中我们用了 require('./hello') 来加载
同一文件夹下的hello.js。

# 通过查找 node_modules 目录加载模块

>如果 require 参数不以“ / ”、“ ./ ”或“ ../ ”开头，而该模块又不是核心模块,直接使用  require('express')  来代替
require('./node_modules/express') 。这是Node.js模块加载的一个重要特性：通过查
找 node_modules 目录来加载模块

# 加载缓存

> Node.js 模块不会被重复加载，这是因为 Node.js 通过文件名缓存所
有加载过的文件模块，所以以后再访问到时就不会重新加载了,注意，Node.js 是根据实际文件名缓存的，而不是 require() 提供的参数缓存的，也就是说即使你分别通过require('express') 和  require('./node_modules/express')  加载两次，也不会重复加载，因为尽管两次参数不同，解析到的文件却是同一个

# 加载顺序

> 下面总结一下使用  require(some_module) 时的加载顺序。

 - (1) 如果 some_module 是一个核心模块，直接加载，结束。
 - (2) 如果 some_module 以“ / ”、“ ./ ”或“ ../ ”开头，按路径加载  some_module ，结束。
 - (3) 假设当前目录为 current_dir，按路径加载 current_dir/node_modules/some_module。
     - 如果加载成功，结束
     - 如果加载失败，令current_dir为其父目录。
   - 重复这一过程，直到遇到根目录，抛出异常，结束。

# 异步存在的陷阱

>for循环的陷阱

```javascript

    var fs = require('fs');

    var files = ['a.txt','b.txt','c.txt'];

    for(var i=0;i<files.length;i++){
         fs.readFile(files[i],'utf-8',function(err,contents){
            console.log(i,12);
            console.log(files[i]+':'+contents);
         });
    }

    //undefined: AAA
    //undefined: BBB
    //undefined: CCC


```

> 因为循环 i值直接变成3,在调回调函数时files[3]
> 为空

``` javascript

//闭包解决

var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];
for (var i = 0; i < files.length; i++) {
(function(i) {
fs.readFile(files[i], 'utf-8', function(err, contents) {
console.log(files[i] + ': ' + contents);
});
})(i);
}

//forEach解决

var fs = require('fs');
var files = ['a.txt', 'b.txt', 'c.txt'];
files.forEach(function(filename) {
fs.readFile(filename, 'utf-8', function(err, contents) {
console.log(filename + ': ' + contents);
});
});

```

# 解决控制流难题

> async：async 是一个控制流解耦模块，它提供了
async.series 、 async.parallel 、 async.waterfall  等函数，在实现复杂的逻辑时使
用这些函数代替回调函数嵌套可以让程序变得更清晰可读且易于维护，但你必须遵循它的编程风格

>streamlinejs和jscex则采用了更高级的手段，它的思想是“变同步为异步”，实现了一个
JavaScript 到JavaScript 的编译器，使用户可以用同步编程的模式写代码，编译后执行时却是异步的

>eventproxy 的思路与前面两者区别更大，它实现了对事件发射器的深度封装，采用一种
完全基于事件松散耦合的方式来实现控制流的梳理。


# 日志输出  用express 的函数

``` javascript

//生产环境

var accessLog = fs.createWriteStream('access.log',{flags:'a'});
app.use(logger('combined', {stream : accessLog}));


//开发环境
var accessLog = fs.createWriteStream('access.log',{flags:'a'});
app.use(logger('dev',{stream : accessLog}));

```

# 使用 cluster 模块

>Node.js 提供了一个核心模块： cluster 。 cluster 的功能是生成与当
前进程相同的子进程，并且允许父进程和子进程之间共享端口。Node.js 的另一个核心模块child_process 也提供了相似的进程生成功能，但最大的区别在于 cluster 允许跨进程端口复用，给我们的网络服务器开发带来了很大的方便


















