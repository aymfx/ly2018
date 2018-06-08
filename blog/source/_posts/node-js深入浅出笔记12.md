---
title: node.js深入浅出笔记12
date: 2017-09-11
tags: node
---
# HTTP
>HTTP（HyperText Transport Protocol）是超文本传输协议的缩写，它用于传送WWW方式的数据，关于HTTP协议的详细内容请参考RFC2616。HTTP协议采用了请求/响应模型。客户端向服务器发送一个请求，请求头包含请求的方法、URL、协议版本、以及包含请求修饰符、客户信息和内容的类似于MIME的消息结构。服务器以一个状态行作为响应，响应的内容包括消息协议的版本，成功或者错误编码加上包含服务器信息、实体元信息以及可能的实体内容。

## http模块
>这是继承于TCP的net模块，但是tcp以connection为单位进行服务，http以request为单位进行服务 如图：

![流程图](https://aymfx.github.io/img/a20170906/a4.png)

>http模块将连接所用的套接字的读写抽象为ServerRequest和ServerResponse对象，他们分别对应请求和相应操作

>在请求产生的过程中，http模块拿到连接中传来的数据，调用二进制模块http_parser进行解析，在解析完请求报文的报头后，触发request事件，调用用户的业务逻辑，如图：

![流程图](https://aymfx.github.io/img/a20170906/a5.png)

## http请求

>对于tcp连接的读操作，http将其封装成ServerRequest对象,报文头会用http_parser进行解析，报文头如下

``` javascript

>GET / HTTP /1.1
>User-Agent:curl/7.24.0 (x86_64-apple-darwin12.0) libcurl/7.24.0 OPenSSL/0.9.8r zlib/1.2.5
>Host:127.0.0.1.8995
>Accept: *//*
```

>被解析成如下属性

 - req.method属性: GET
 - req.url:值为/
 - req.httpVersion属性值:1.1
 - 其余的都被放置在req.headers上传递给业务逻辑以供调用
 
>报文体部分是一个只读流对象，如果业务逻辑需要读取报文体的数据，则需要等数据流结束后操作

```javascript

        function(req,res){
        var buffers = [];
        req.on('data',function(trunk){
            buffers.push(trunk);
        }).on('end',function(){
            var buffer = Buffer.concat(buffers);
            res.end('Hello world')
        })
    }

```

## HTTP响应

>用于设置响应头的有res.setHeader()和writeHead()，setHeader()可以多次设置,但是只有调用writeHead,报头才会写入连接中

>响应体则是由res.write()和res.end()实现,后者会先调用write()发送数据，然后发送信号告诉服务器这次响应结束，它一定要写，否则客户端一直处在等待状态

## HTTP事件

 - connection事件:在开始http请求和响应之前，客户端要与服务器端建立底层的TCP连接，这个连接可能因为开启了keep-alive,可以在多次请求响应之间使用，当这个连接建立时，服务器触发一次connection事件
 - request事件:建立TCP连接后，http模块的底层将在数据流中抽离出http请求和http响应，当请求数据发送到服务器端，在解析出http请求头后，将会触发该事件，res.end()后，tcp连接可能用于下一次响应
 - close事件:与TCP服务器行为一直，调用server.close()停止接收新的连接，当已有的连接都断开时，触发该事件，可以给server.close()传递一个回调函数来快速注册该事件
 - checkContinue事件:比较有用的事件，对某些大型的数据传输有用
 - connect：当客户端发起connect请求时触发，而发起connect请求通常在http代理时出现，如果不监听该事件，发送请求的连接将会关闭
 - upgrade事件:当客户端要求升级连接的协议时，需要喝服务器端协商，客户端会在请求头中带上upgrade字段，服务器端会在接收到请求时触发该事件
 - clientError：连接的客户端触发error事件时，该错误会传递到服务器，触发该事件

## Http客户端

>通过http.request(options,connect)可以构造一个http客户端

``` javascript
//服务器端

var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.write('在学习');
    res.write('mess');
    res.end("node");

}).listen(3000);

//客户端

var http = require('http');

var options = {
    host:'127.0.0.1' //服务器IP地址
    hostname:'127.0.0.1',//服务器名字
    port:3000,//端口号
    path:'/',//请求路劲
    method:'GET'//
    //socketPath:Domain套接字路劲
    //localAddress：建立网络连接的本地网卡
    //headers:请求头对象
    //auth:BAsic认证
}

var req = http.request(options,function(res){
    console.log('STATUS'+res.statusCode);
    console.log('HEADERS'+JSON.stringify(res.headers))
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
        console.log(chunk);
    })
});

req.end();

```

## HTTP代理
>http模块包含一个默认的客户端代理对象http.globalAgent，它对每一个服务器端创建的连接进行了管理，默认情况下,通过clientRequest对象对用一个服务器发起的http请求最多可以创建5个连接，他的实质是一个连接池
![流程图](https://aymfx.github.io/img/a20170906/a6.png)

>通过这个我们可以自行构造代理对象，从而扩充连接数

``` javascript

    var agent = new http.Agent({
    maxSockets:10
})

    var options = {
        host:'127.0.0.1' //服务器IP地址
        hostname:'127.0.0.1',//服务器名字
        port:3000,//端口号
        path:'/',//请求路劲
        method:'GET'
        agent:agent
    }
    
```

## HTTP客户端事件
 - response:当得到服务器响应时触发该事件
 - socket:当底层连接池中建立的连接分配给当前请求对象时，触发该事件
 - connect:当客户端向服务器端发起connect请求时，如果客户端响应200状态码，客户端会触发该事件
 - upgrade:客户端向服务器发起upgrade请求时，如果服务端响应101 Switching Protocols状态，客户端会触发该事件
 - continue:客户端向服务器发起Expect：100-continue头信息，以试图发送较大的数据量，如果服务器端响应100 continue状态，客户端将触发该事件
















