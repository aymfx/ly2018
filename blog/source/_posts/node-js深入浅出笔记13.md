---
title: node.js深入浅出笔记13
date: 2017-09-12 14:49:09
tags: node
---
# 构建WebSocket服务 

>websocket基于事件编程的编程模型与node自定义事件相差无几,node的事件驱动十分商场与大量客户端保持高并发得连接

## websocket与传统的http优势
 - 客户端与服务端只建立一个tcp连接，可以使用更少的连接
 - websocket服务器可以推送数据到客户端，这远比http请求响应模式更加灵活，更加高效
 - 有更轻量级的协议头，减少数据传输量

>websocket客户端实例

``` javascript

var socket = new WebSocket('ws://127.0.0.1:1366/updates');
socket.onopen = function () {
    setInterval(function(){
            if(socket.bufferedAmount == 0)
                socket.send(getUpdateData());
        },50);
}

socket.onmessage = function(event){
    //做些啥

}

```

>WebSocket协议主要两个部分：握手和传输数据

## WebSocket握手
>客户端在建立连接的时候，通过http发送请求报文，它比普通的http请求协议多了以下两个东西,表示服务端协议升级为WebSocket
 - Upgrade:websocket
 - Connection:Upgrade

>还有三个特别参数

![流程图](https://aymfx.github.io/img/a20170906/a2.png)

 - Sec-WebSocket-Key:用于安全校验

>它的属性值用base64编码，服务器收到后与他自己的字符串进行相连，然后通过sha1安全散列算法计算出结果后，在进行base64编码，最后返回客户端，算法如下
var crypto = require("crypto");
var val = crypto.createHash('sha1').update(key).digest('base64');

 - Sec-WebSocket-Protocol:指定自协议
 - Sec-WebSocket-Version：版本号

``` javascript

//示例代码，跑不起来

//client.js

var WebSocket = function (url) {
    //伪代码，解析ws://127.0.0.1:12010/updates,用于请求
    this.options = parseUrl(url);
    this.connect();
}

WebSocket.prototype.onopen = function () {
    console.log("干嘛的");
}

WebSocket.prototype.setSocket = function () {
    var this = that;
    var key = new BUffer(this.options.protocolVersion+'-'+Date.now()).toString('base64');
    var shasum = crypto.createHash('sha1');
    var expected = shasum.update(key+'258EAFA5-E914-47DA-95CA-C5ABoDC85B11').digest('base64');
    var options = {
        port:this.options.port,
        host:this.options.hostname,
        headers: {
            'Connection':'Upgrade',
            'Upgrade':'websocket',
            'Sec-WebSocket-Version':this.options.protocolVersion,
            'Sec-WebSocket-Key':key
        }
    };
    var req = http.request(options);
    req.end();
    req.on('upgrade',function(res,socket,upgradeHead){
        //连接成功
        that.setSocket(socket);
        //触发open事件
        that.onopen();
    })
}

//server.js

var http = require('http');
var crypto = require('crypto');
var server=http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.write('在学习');
    res.write('mess');
    res.end("node");

}).listen(12010);

//在收到upgrade请求后，告之客户端允许切换协议
server.on('upgrade',function(req,socket,upgradeHead){
    var head = new Buffer(upgradeHead.length);
    upgradeHead.copy(head);
    var key = req.headers['sec-websocket-key'];
    var shasum = crypto.createHash('sha1');
    key = shasum.update(key+'258EAFA5-E914-47DA-95CA-C5ABoDC85B11').digest('base64');
    var headers = [
        'HTTP/1.1 101 SWitching Protocols',
        'Upgrade:websocket',
        'Connection:Upgrade',
        'Sec-WebSocket-Accept:'+key,
        'Sec-WebSocket-Protocol:'+protocol
    ];
    //让数据立即发送
    socket.setNoDelay(true);
    socket.write(headers.concat('','').join('\r\n'));
    // 建立服务器端的WebSocket连接
    var websocket = new WebSocket();
    websocket.setSocket(socket);
})

```

## WebSocket数据传输

>完成握手后，就不在进行http交互，而是开始WebSocket的数据帧协议，实现客户端与服务端的数据交互  示意图如下

![流程图](https://aymfx.github.io/img/a20170906/a8.png)

>握手完成后将会触发onopen()

``` javascript
socket.onopen = function(){
    //TODO:opened()
}

```

>由于服务端没有onopen()方法可言,为了完成TCP套接字到websocket事件的封装，需要在接收数据时处理，websocket的数据帧协议即是在底层data事件上封装完成的

``` javascript
//接收
WebSocket.prototype.setSocket = function (socket) {
    this.socket = socket;
    this.socket.on('data',this.receiver);
};

//发送

WebSocket.prototype.send = function (data) {
    this._send(data)
}

```

# 网络服务与安全

>node 提供了3个模块，分别是crypto,tls,https,其中crypto主要用于加密解密，SHA！,md5等加密算法在其中都有体现，真正用于网络层的是另外两个,tls提供了与net类似的功能，区别在于建立tls/ssl加密的tcp连接上，对于https而言，他与http接口一致，只是多了安全连接。

## TLS/SSL

>秘钥之间的加密解密。是非对称结构，如图所示

![流程图](https://aymfx.github.io/img/a20170906/a8.png)

>利用node底层opensll生成私钥和公钥

``` javascript
//服务器 私钥
openssl genrsa -out server.key 1024
//服务器 公钥
openssl rsa -in server.key -pubout -out server.pem
//客户端 私钥
openssl genrsa -out client.key 1024
//客户端 公钥
openssl rsa -in client.key -pubout -out client.pem

```

>依然存在中间人伪造站点的情况

![流程图](https://aymfx.github.io/img/a20170906/a10.png)

>数字证书解决这一波问题，详情自己百度，我就简单的写写

 - 为了得到签名证书，服务器端需要通过自己的的私钥生成csr文件。ca机构将通过这个文件颁发属于该服务器端的签名证书，只要通过ca机构的就能验证证书是否合法
 







