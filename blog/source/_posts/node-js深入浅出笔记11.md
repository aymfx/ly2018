---
title: node.js深入浅出笔记11
date: 2017-09-08 10:36:46
tags: node
---
## 构建UDP服务

>UDP又称用户数据包协议，与TCP一样属于网络传输层,udp不是面向连接的，tcp中一旦建立连接，所有会话基本完成，客户端如果要与另外一个tcp服务通信，需要另创建一个套接字来完成连接，但在udp中，一个套接字可以和多个udp服务通讯，它虽然提供面向失误的简单不可靠信息传输服务，在网络差的情况会存在丢包的情况，但它无需连接，资源消耗，处理快速且灵活，很适合音频和视频传输

### 创建udp套接字

> udp套接字一旦创建，既可以作为客户端发送数据，也可以作为服务端接收数据

``` javascript

va dgram = require('dgram');
var socket = dgram.createSocket('udp4');
```



### 创建udp服务器端
>如果需要udp套接字接收网络信息，我们只需调用dgram.bind(port,[address])对网卡和端口进行绑定即可

``` javascript
//server.js

var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('message',function(msg,rinfo) {
    console.log('server got:'+msg+'from'+rinfo.address+':'+rinfo.port);
})

server.on('listening',function(){
    var address = server.address();
    console.log('server listening'+address.address+":"+address.port);
})

server.bind(12345);

```

>创建一个UDP客户端

``` javascript

var dgram = require('dgram');

var message = new Buffer("我的名字叫 ly");

var client = dgram.createSocket('udp4');

client.send(message,0,message.length,12345,'localhost',function(){
     client.close();
})

```

>套接字对象用在客户端时，可以调用send()方法发送消息到网络中

``` bash
socket.send(buf,offset,length,port,address,[callback])
```
>这些参数的分别是发送的Buffer对象，buffer的偏移，Buffer的长度,目标端口，目标地址，发送后完成的回调，与TCP套接字的write()相比，send()方法的参数列表相对复杂，但是他可以随意发送数据到网络中的服务器端，而Tcp需要发送给另一端则需要重新通过套接字构造新的链接

### udp套接字事件
>udp套接字只是EventEmitter的实例，而非Stream的实例
 - message:当udp套接字侦听网卡端口后，接收到消息时触发该事件，触发携带的数据为消息Buffer对象和一个远程的地址信息
 - listening:当udp套接字开始侦听时触发该事件
 - close：调用close()方法时触发该事件，并不在触发message事件，如需在此触发message事件，重新绑定即可
 - error:发生异常时抛出


