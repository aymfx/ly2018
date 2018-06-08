---
title: node.js开发指南笔记4
date: 2017-08-14 14:06:29
tags: node
---

# 使用 http  模块

``` html

//html页面
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <form method="post" action="http://localhost:3000">
        <input type="text" name="name">
        <input type="number" name="age">
        <input type="submit">
    </form>
</body>

</html>

```

``` javascript

// http服务器

var http = require("http");

var querystring = require('querystring');
var util = require("util");

http.createServer(function(req,res){
    var post = "";
    req.on('data',function(thunk){
        post +=thunk;
    })

    req.on('end',function(){
        post = querystring.parse(post);
        res.writeHead(200,{"Content-Type":'text/html;charset=utf-8'});
        res.write("开始");
        res.write(util.inspect(post));
        res.end("结束");
    })
    

}).listen(3000);

```

# 学习express框架

> bin/www 部分

```javascript

    #!/usr/bin/env node

    /**
     * Module dependencies.
     */

    var app = require('../app');
    var debug = require('debug')('microblog:server');
    var http = require('http');

    /**
     * 配置端口号
     */
    console.log(process.env.PORT);
    var port = normalizePort(process.env.PORT || '3000');
    app.set('port', port);

    /**
     * 创建http服务
     */

    var server = http.createServer(app);

    /**
     * 监听接口以及所有的接口方法以及抛出的异常
     */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    /**
     * 把数字，字符串转换成端口号，实在是难转的就返回false
     */

    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        // named pipe
        return val;
      }

      if (port >= 0) {
        // port number
        return port;
      }

      return false;
    }

    /**
     * 监听事件抛出的异常
     */

    function onError(error) {
      if (error.syscall !== 'listen') { //error.syscall一个表示失败的系统调用信息的字符串
        throw error;
      }
      console.log(typeof port,1212);
      var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

      // 绑定特定的端口号异常情况
      switch (error.code) {
        case 'EACCES': //eacces权限不够
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE': //端口号被占用的情况
          console.error(bind + ' is already in use');
          process.exit(1); //结束进程
          break;
        default:
          throw error;
      }
    }

    /**
     * http发出的请求.
     */

    function onListening() {
      var addr = server.address();
      console.log(121212,addr);
      var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
      debug('Listening on ' + bind); //debugger模式监听
      console.log('Listening on' + bind);
    }


```


