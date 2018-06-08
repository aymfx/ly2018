---
title: node.js开发指南笔记1
date: 2017-08-09 17:26:25
tags: node
---

# 创建一个服务

``` javascript
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('在学习');
    res.end("node");

}).listen(3000);

```

> 利用http创建一个监听的服务器 localhost:3000

# 创建一个读取文件内容的异步线程函数

``` javascript

var fs = require('fs');
fs.readFile('file.txt', 'utf-8', function(err, data) {
        if (err) {
        console.error(err);
        } else {
        console.log(data);
        }
});
console.log('end.');

```

> 执行结果 end先出来 然后是文件内容

> readFile()的三个参数,第一个是文件名（路径），第二个是编码方式，第三个是一个回调函数



# 创建一个读取文件内容的同步线程函数

``` javascript

var fs = require('fs');
var data = fs.readFileSync('file.txt', 'utf-8');
console.log(data);
console.log('end.');

//结果

Contents of the file.
end.

```

# node中的事件  
> Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列

> 事件由 EventEmitter  对象提供,fs.readFile()以及fs.readFileSync()都是由它实现

``` javascript

var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event',function(){
    console.log('我被执行了');
})

setTimeout(function(){
    event.emit('some_event');
},1000);
```

# 引入模块概念

>  exports 是模块公开的接口， require 用于从外部获取一个模块的接口

> 第一种引入方式

``` javascript

//module1.js
function Maths(){
    this.add=function(a,b){
        console.log(a+b);
    }
    this.minus=function(a,b){
        console.log(a-b);
    }
}

exports.Maths = Maths;

//demo.js

var Maths = require('./module1').Maths;

var xx = new Maths();

console.log(xx.add(1,6));  //7  

```

> 第二种方式

``` javascript

//module1.js

function Maths(){
    this.add=function(a,b){
        console.log(a+b);
    }
    this.minus=function(a,b){
        console.log(a-b);
    }
}

//demo1.js

var Maths = require('./module1');

var math = new Maths();

console.log(math.add(1,8)); //9


module.exports = Maths;
```

# 引入包的概念

> 符合Commonjs规范的包应该具备以下条件

 - package.json必须在包的顶层目录下
 - 二进制文件必须在lib目录下
 - 文档应该在doc目录下
 - 单元测试在test目录下

> 一个简单的包实例

> 建一个目录叫somepackage，里面建一个json文件和一个目录文件lib，目录文件里面写一个模块hello.js

``` javascript
    
    // package.json
    {
        "main":"./lib/hello.js"
    }

    //lib/hello.js
        exports.hello = function() {
        console.log('hello,ly');
    }

```

> 调用这个模块

``` javascript
    //与somepackage同级 getHello.js
    var somePackage = require('./somePackage');
    somePackage.hello();
    
```

> 运行 node getHello.js 输出 hello，ly

> 我们在调用某个包时会先检查包中的package.json,将main字段作为入口模块，如果不存在则会找index.js或者index.node

> package.json作为描述包的文件 有几个必须存在的字段

 - name:包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含
空格
 - description:包的简要说明
 - version ：符合语义化版本识别规范的版本字符串
 - keywords ：关键字数组，通常用于搜索
 - maintainers ：维护者数组，每个元素要包含 name 、 email （可选）、 web （可选）字段
 - contributors ：贡献者数组，格式与 maintainers 相同。包的作者应该是贡献者
数组的第一个元素
 - bugs ：提交bug的地址，可以是网址或者电子邮件地址
 - licenses 许可证数组，每个元素要包含 type （许可证的名称）和  url （链接到
许可证文本的地址）字段
 - repositories ：仓库托管地址数组，每个元素要包含 type  （仓库的类型，如  git ）、url （仓库的地址）和  path （相对于仓库的路径，可选）字段
 - dependencies ：包的依赖，一个关联数组，由包名称和版本号组成

> 书中给出的实例

``` javascript
{
"name": "mypackage",
"description": "Sample package for CommonJS. This package demonstrates the required
elements of a CommonJS package.",
"version": "0.7.0",
"keywords": [
"package",
"example"
],
"maintainers": [
{
"name": "Bill Smith",
"email": "bills@example.com",
}
],
"contributors": [
{
"name": "BYVoid",
"web": "http://www.byvoid.com/"
}
],
"bugs": {
"mail": "dev@example.com",
"web": "http://www.example.com/bugs"
},
"licenses": [
{
"type": "GPLv2",
"url": "http://www.example.org/licenses/gpl.html"
}
],
"repositories": [
{
"type": "git",
"url": "http://github.com/BYVoid/mypackage.git"
}
],
"dependencies": {
"webkit": "1.2",
"ssl": {
"gnutls": ["1.0", "2.0"],
"openssl": "0.9.8"
}
}
}

``` 

# 包管理器 npm

> 安装包 npm i 包名 

> 对于全局安装的包(npm [install/i] -g [package_name]),它不会装在本地的node_modules下面,他会安装在系统目录下的/usr/local/lib/node_modules/ 同时package.json 的bin字段包含的文件会被链接到 /usr/local/bin/ 于是可以在命令行中直接运行了

> 创建全局链接 - 将全局包当本地包使用

 - npm link express
./node_modules/express -> /usr/local/lib/node_modules/express
 - win系统不支持

> 包的发布

  - npm init 初始化
  - npm adduser 输入用户名、密码、邮箱 
  - npm whoami  测验是
否已经取得了账号
  - npm publish 发布
  - 修改版本号 version 跟新
  - npm unpublish 取消发布 

# 调试

> node debug 文件

 - run      执行脚本，在第一行暂停
 - restart  重新执行脚本
 - cont, c  继续执行，直到遇到下一个断点
 - next, n  单步执行
 - step, s  单步执行并进入函数
 - out, o   从函数中步出
 - setBreakpoint(), sb()        在当前行设置断点
 - setBreakpoint(‘f()’), sb(...)    在函数f的第一行设置断点
 - setBreakpoint(‘script.js’, 20), sb(...)      在 script.js 的第20行设置断点
 - clearBreakpoint, cb(...)     清除所有断点
 - backtrace, bt    显示当前的调用栈
 - list(5)      显示当前执行到的前后5行代码
 - watch(expr)      把表达式 expr 加入监视列表
 - unwatch(expr)    把表达式 expr 从监视列表移除
 - watchers     显示监视列表中所有的表达式和值
 - repl         在当前上下文打开即时求值环境
 - kill         终止当前执行的脚本
 - scripts      显示当前已加载的所有脚本
 - version      显示 V8 的版本

# 远程调试

> 暂时不考虑

> 命令行
 - node --debug [= port ] script.js
 - node --debug-brk [= port ] script.js
















