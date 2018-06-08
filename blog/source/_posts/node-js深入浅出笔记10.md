---
title: node.js深入浅出笔记10
date: 2017-09-07 09:28:30
tags: node
---
# 网络编程
>node是一个面向网络而生的平台，它具有事件驱动，无阻塞，单线程等特性，具有良好的伸缩性，很适合网络编程

## 构建Tcp服务

> TCP协议的组成

![流程图](https://aymfx.github.io/img/a20170906/a2.png)

> TCP是面向链接的协议，其显著特征是传输之前要进行三次握手

## 构建Tcp服务端

``` javascript
//server.js
    var net = require('net');

    var server = net.createServer(function(socket){
        // 新的链接
        socket.on('data',function(data){

            socket.write('hello');
        })

        socket.on('end',function(){
            console.log('cut connect');
        })

        socket.write("我叫ly，欢迎来到我的小屋")

    }).listen(8995,function(){
        console.log("服务链接");
    })

```

>还有一种写法

``` javascript
    var server = net.createServer();
    server.on('connection',function(socket){})
    server.listen(8555);
```


>客户端，可以用net模块进行构造，来测试构建的TCP服务

``` javascript
//client.js
var net = require('net');
var client = net.connect({port:8995},function(){
    console.log('client connected');
    client.write("ly's home\n");
})

client.on('data',function(data){
    console.log(data.toString());
    client.end();
})

client.on('end',function() {
    console.log("is over");
})

```

>ps 如果是linux，在填写时直接填path var client = net.connect({path:'/tmp/echo.sock'})

## TCP服务事件

>服务事件
 - listening: 对应方法:server.listen(port,listenEvent)
 - connection:对应方法:net.createServer
 - close:调用server.close()后，服务器停止接收套接字，等所有连接都断开后，出发该事件
 - error:当服务器异常时，该事件触发
 
>连接事件
 - data:当调用write()发送数据时，另一端会触发data事件，事件传递就是write()发送的数据
 - end:当连接的任意一端发送了FIN数据时，该事件触发
 - connect:该事件用于客户端，当套接字与服务器连接成功时触发
 - drain：当任意一端调用write()发送数据时，当前这端会触发该事件
 - error:发生异常触发事件
 - close:套接字完全关闭，触发该事件
 - tiemout:当一定时间连接不再活跃，该事件会被触发，通知当前该链接已经闲置了

>TCP套接字是可读可写的Stream对象,利用pipe()方法巧妙的实现管道操作

>简单实现echo服务器

``` javascript

var net = require('net');
var server = net.createServer(function(socket){
    socket.write('Echo server\r\n');
    socket.pipe(socket);
}).sisten(8995,'127.0.0.1')

```





