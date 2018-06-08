---
title: node.js开发指南笔记3
date: 2017-08-13 14:45:43
tags: node
---

# 文件系统  fs

> fs 模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等 POSIX 文件系统操作。

>fs.readFile() 异步操作 

>fs.readFile(filename,[encoding],[callback(err,data)]) 是最简单的读取
文件的函数。它接受一个必选参数  filename ，表示要读取的文件名。第二个参数  encoding
是可选的，表示文件的字符编码。 callback 是回调函数，用于接收文件的内容。如果不指
定  encoding ，则  callback 就是第二个参数。回调函数提供两个参数  err 和  data ， err 表
示有没有错误发生， data 是文件内容。如果指定了  encoding ， data 是一个解析后的字符
串，否则  data 将会是以  Buffer 形式表示的二进制数据

> 不指定编码

``` javascript
var fs = require('fs');
fs.readFile('content.txt', function(err, data) {
if (err) {
console.error(err);
} else {
console.log(data);
}
});

//输出的内容

<Buffer 54 65 78 74 20 e6 96 87 e6 9c ac e6 96 87 e4 bb b6 e7 a4 ba e4 be 8b>


```

> tips：Node.js 的异步编程接口习惯是以函数的最后一个参数为回调函数，通
常一个函数只有一个回调函数。回调函数是实际参数中第一个是  err ，其
余的参数是其他返回的内容。如果没有发生错误， err 的值会是  null 或
undefined 。如果有错误发生， err 通常是  Error 对象的实例。


>fs.readFileSync() 同步操作

>fs.readFileSync(filename, [encoding]) 是  fs.readFile 同步的版本。它接受
的参数和  fs.readFile 相同，而读取到的文件内容会以函数返回值的形式返回。如果有错
误发生， fs 将会抛出异常，你需要使用  try 和  catch 捕捉并处理异常

# fs.open

>fs.open(path, flags, [mode], [callback(err, fd)]) 是 POSIX  open 函数的
封装，与 C 语言标准库中的  fopen 函数类似。它接受两个必选参数， path 为文件的路径，flags 可以是以下值
 - r  ：以读取模式打开文件。
 - r+ ：以读写模式打开文件。
 - w  ：以写入模式打开文件，如果文件不存在则创建。
 - w+ ：以读写模式打开文件，如果文件不存在则创建。
 - a  ：以追加模式打开文件，如果文件不存在则创建。
 - a+ ：以读取追加模式打开文件，如果文件不存在则创建

>mode 参数用于创建文件时给文件指定权限，默认是 0666。回调函数将会传递一个文件描述符


# fs.read
>fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead,
buffer)]) 是 POSIX  read 函数的封装，相比  fs.readFile 提供了更底层的接口。 fs.read
的功能是从指定的文件描述符  fd 中读取数据并写入  buffer 指向的缓冲区对象。 offset 是
buffer 的写入偏移量。 length 是要从文件中读取的字节数。 position 是文件读取的起始
位置，如果  position 的值为  null ，则会从当前文件指针的位置读取。回调函数传递
bytesRead 和  buffer ，分别表示读取的字节数和缓冲区对象。

```javascript
    var fs = require('fs');

    fs.open('text.txt','r',function(err,fd){
        if(err){
            return;
        }

        var buf = new Buffer(20);

        fs.read(fd,buf,0,20,null,function(err,bytesRead,buffer){
            if(err){
                return;
            }
            console.log("bytesRead:"+bytesRead); //bytesRead:20
            console.log(buffer);//<Buffer e8 b6 8a e5 8a aa e5 8a 9b ef bc 8c e8 b6 8a e5 b9 b8 e8 bf>
            fs.close(fd)
        })

    })

```

# HTTP 服务器与客户端

>Node.js 标准库提供了  http  模块，其中封装了一个高效的 HTTP 服务器和一个简易的
HTTP 客户端。 http.Server 是一个基于事件的 HTTP 服务器，它的核心由 Node.js 下层 C++部分实现，而接口由 JavaScript 封装，兼顾了高性能与简易性。 http.request 则是一个HTTP 客户端工具，用于向 HTTP 服务器发起请求，例如实现 Pingback或者内容抓取

# HTTP 服务器

``` javascript
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write('在学习');
    res.end("node");

}).listen(3000);
```

# http.Server 的事件 
 -  request ：当客户端请求到来时，该事件被触发，提供两个参数  req  和 res ，分别是
http.ServerRequest 和  http.ServerResponse  的实例，表示请求和响应信息
 - connection ：当 TCP 连接建立时，该事件被触发，提供一个参数  socket ，为
net.Socket 的实例。 connection 事件的粒度要大于  request ，因为客户端在
Keep-Alive 模式下可能会在同一个连接内发送多次请求
 - close ：当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

> 以上例子的其实显示表达应该这样写

``` javascript
   var http = require('http');
    var server = new http.Server();

    server.on('request',function(req,res){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write("操作一波");
        res.end("来呀");
    })

    server.listen(4000) 
```

# http.ServerRequest 

>http.ServerRequest  是 HTTP 请求的信息，是后端开发者最关注的内容。它一般由
http.Server 的  request 事件发送，作为第一个参数传递，通常简称  request 或  req 。ServerRequest  提供一些属性

>HTTP 请求一般可以分为两部分：请求头（Request Header）和请求体（Requset Body）。以上内容由于长度较短都可以在请求头解析完成后立即读取。而请求体可能相对较长，
需要一定的时间传输，因此  http.ServerRequest  提供了以下3个事件用于控制请求体
传输
 - data ：当请求体数据到来时，该事件被触发。该事件提供一个参数  chunk ，表示接
收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会被调
用多次
 - end ：当请求体数据传输完成时，该事件被触发，此后将不会再有数据到来
 - close ： 用户当前请求结束时，该事件被触发。不同于  end ，如果用户强制终止了
传输，也还是调用 close 

> ServerRequest 的属性

 - complete     客户端请求是否已经发送完成
 - httpVersion  HTTP 协议版本，通常是 1.0 或 1.1
 - method       HTTP 请求方法，如 GET、POST、PUT、DELETE 等
 - url          原始的请求路径，例如 /static/image/x.jpg 或 /user?name=byvoid
 - headers      HTTP 请求头
 - trailers     HTTP 请求尾（不常见）
 - connection   当前 HTTP 连接套接字，为 net.Socket 的实例
 - socket       connection 属性的别名
 - client       client 属性的别名

> 获取 GET 请求内容 通过Node.js 的  url 模块中的  parse 函数提供了这个功能

```javascript
    var http = require('http');

    var url = require('url');

    var util = require('util');

    http.createServer(function(req,res){
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.end(util.inspect(url.parse(req.url, true)));
    }).listen(3000)

    /*Url {
      protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?name=ly&email=ly@ly.com%EF%BC%8C%E6%88%91',
      query: { name: 'ly', email: 'ly@ly.com，我' },
      pathname: '/user',
      path: '/user?name=ly&email=ly@ly.com%EF%BC%8C%E6%88%91',
      href: '/user?name=ly&email=ly@ly.com%EF%BC%8C%E6%88%91' }*/

```
# 获取 POST 请求内容
>

```javascript
 var http = require('http');
  var querystring = require('querystring');
  var util = require('util');
  http.createServer(function(req,res){
    var post = "";
    req.on('data',function(chunk){
        post +=chunk;
    })
    req.on('end',function(){
        post = querystring.parse(post);
        res.end(util.inspect(post))
    })
  }).listen(3000);
 //{ name: 'ly', age: '18\n' } 用postman测试

```
> 上面代码并没有在请求响应函数中向客户端返回信息，而是定义了一个  post 变量，用
于在闭包中暂存请求体的信息。通过  req 的  data 事件监听函数，每当接受到请求体的数据，就累加到  post 变量中。在  end 事件触发后，通过 querystring.parse 将  post 解析为真正的 POST 请求格式，然后向客户端返回

> tips：不要在真正的生产应用中使用上面这种简单的方法来获取 POST 请
求，因为它有严重的效率问题和安全问题

# http.ServerResponse 

> http.ServerResponse  是返回给客户端的信息，决定了用户最终能看到的结果。它
也是由  http.Server 的  request  事件发送的，作为第二个参数传递，一般简称为
response 或  res 

 - response.writeHead(statusCode, [headers]) ：向请求的客户端发送响应头。
statusCode  是 HTTP 状态码，如 200 （请求成功）、404 （未找到）等。 headers
是一个类似关联数组的对象，表示响应头的每个属性。该函数在一个请求内最多只
能调用一次，如果不调用，则会自动生成一个响应头

 - response.write(data, [encoding]) ：向请求的客户端发送响应内容。 data 是
一个  Buffer 或字符串，表示要发送的内容。如果  data 是字符串，那么需要指定
encoding 来说明它的编码方式，默认是 utf-8 。在 response.end 调用之前，
response.write  可以被多次调用。

 - response.end([data], [encoding]) ：结束响应，告知客户端所有发送已经完
成。当所有要返回的内容发送完毕的时候，该函数 必须 被调用一次。它接受两个可
选参数，意义和 response.write  相同。如果不调用该函数，客户端将永远处于
等待状态

# HTTP 客户端

> http  模块提供了两个函数  http.request  和  http.get ，功能是作为客户端向 HTTP服务器发起请求

> http.request(options, callback) 发起 HTTP 请求。接受两个参数， option 是
一个类似关联数组的对象，表示请求的参数， callback 是请求的回调函数。 option
常用的参数如下所示
 - host ：请求网站的域名或 IP 地址。
 - port ：请求网站的端口，默认 80。
 - method ：请求方法，默认是 GET。
 - path ：请求的相对于根的路径，默认是“ / ”。 QueryString  应该包含在其中。
例如  /search?query=byvoid 。
 - headers ：一个关联数组对象，为请求头的内容

> callback  传递一个参数，为 http.ClientResponse 的实例 

```javascript

      var http = require('http');
      var querystring = require('querystring');

      var contents = querystring.stringify({
        name:'ly',
        age:'18'
      });

      var options ={
        host:'127.0.0.9',
        port:3000,
        path:'/server.js',
        method:'POST',
        headers:{
            'Content-Type':"application/x-www-form-urlencoded",
            'Content-Length':contents.length
        }

      }

      var req = http.request(options,function(res){
            res.setEncoding('utf8');
            res.on("data",function(data){
                console.log(data);
            })
      })

      req.write(contents);
      req.end();
```

# 简化版的get请求

```javascript
    var http = require('http');
    http.get({host: 'www.byvoid.com'}, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
    console.log(data);
    });
    });

```

#  http.ClientRequest

> http.ClientRequest  是由  http.request 或  http.get 返回产生的对象，表示一
个已经产生而且正在进行中的 HTTP 请求。它提供一个  response  事件，即  http.request或  http.get  第二个参数指定的回调函数的绑定对象

```javascript
    var http = require('http');
    var req = http.get({host: 'www.baidu.com'});
    req.on('response', function(res) {
    res.setEncoding('utf8');
    res.on('data', function (data) {
    console.log(data);
    });
    });

```

> http.ClientRequest  像  http.ServerResponse 一样也提供了  write  和  end  函
数，用于向服务器发送请求体，通常用于 POST、PUT 等操作。所有写结束以后必须调用  end
函数以通知服务器，否则请求无效。 http.ClientRequest  还提供了以下函数

 - request.abort() ：终止正在发送的请求。
 - request.setTimeout(timeout, [callback]) ：设置请求超时时间， timeout 为
毫秒数。当请求超时以后， callback 将会被调用

#  http.ClientResponse

>http.ClientResponse 与  http.ServerRequest 相似，提供了三个事件  data 、 end
和  close ，分别在数据到达、传输结束和连接结束时触发，其中  data 事件传递一个参数chunk ，表示接收到的数据

 - statusCode  HTTP 状态码，如 200、404、500
 - httpVersion  HTTP 协议版本，通常是 1.0 或 1.1
 - headers  HTTP 请求头
 - trailers  HTTP 请求尾（不常见）

>http.ClientResponse 还提供了以下几个特殊的函数

 - response.setEncoding([encoding]) ：设置默认的编码，当  data 事件被触发
时，数据将会以  encoding 编码。默认值是  null ，即不编码，以  Buffer 的形式存
储。常用编码为 utf8
 - response.pause() ：暂停接收数据和发送事件，方便实现下载功能。
 - response.resume() ：从暂停的状态中恢复