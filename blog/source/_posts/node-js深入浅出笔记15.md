---
title: node.js深入浅出笔记15
date: 2017-09-22 09:54:31
tags: node
---

# 缓存

> 通过缓存可以节省不必要的传输，对用户和服务提供者都有好处，雅虎军规有几条缓存规则
 - 添加Expires或者Cache-Control到报文头中
 - 配置ETags
 - 让Ajax可缓存

>通常意义来说，大多数请求只存在于Get请求中

![流程图](https://aymfx.github.io/img/a20170925/a1.png)

>我们可以通过 if-Modified-Since来判断是否需要更新版本,last-Modified表示最后一次更新时间，代码如下

``` javascript

var handle = function(req,res){
    fs.stat(filename,function(err,stat){
            fs.lastModified = stat.mtime.toUTCString();
            if(lastModified === req.headers['if-Modified-Since']) {
                res.writeHead(304,'Not Modified');
                res.end();
            } else {
                fs.readFile(filename,function(err,file){
                        var lastModified = stat.mtime.toUTCString();
                        res.setHeader('Last-Modified',lastModified);
                        res.writeHead(200,"OK");
                        res.end(file);
                    })
            }
        })
}

```

>采用时间戳有一点缺陷

 - 时间戳改动内容不一定改动
 - 时间戳只能精确到秒，对于频繁的改动无法生效

> 用 ETag解决 ，服务决定他的生成规则，根据文件生成散列值 方法如下

``` javascript
    
    var getHash = function (str) {
        var shasum = crypto.createHash('sha1');
        return shasum.update(str).digest('base64');
    }

    //ETag的请求和响应是 If-None-Match/ETag

    var handle = function (req,res) {
        fs.readFile(filename,function(err,file) {
                var hash = getHash(file);
                var noneMatch = req['if-none-match'];
                if(hash === noneMatch) {
                    res.writeHead(304,'Not Modified');
                    res.end();
                }else{
                    res.setHeader("Etag",hash);
                    res.writeHead(200,"Ok");
                    res.end(file);
                }
            })
    }

```

>expires缺陷，服务器与本地会存在时间不一致的情况,可以用Cache-Conctrl解决

``` javascript
    
    var handle = function(req,res) {
        fs.readFile(filename,function(err,file){
                res.setHeader("Cache-Control","max-age="+10*365*24*60*60*1000);
                res.writeHead(200,"OK");
                res.end(file);
            })
    }
```

> 清除缓存

 - 家版本号 http://url.com/?v=20170926
 - 内容分的哈希值  http://url.com/?hash = adasdasda

## Basic认证

> 如果一个页面需要basic认证，他会检查报文头的Authorization字段的内容，该字段由认证方式和加密值构成

``` javascript

   var  encode = function (username,password) {
    return new Buffer(username+":"+password).toString('base64');
   }

   //如果用户首次访问该网址，url地址中也没携带认证内容，那么浏览器会响应一个401未授权的状态码
    
    function (req,res) {
        var auth = req.headers['authorization'] || '';
        var parts = auth.split('');
        var method = parts[0] || '';//Basic
        var encoded = parts[1] || '';sxdsdvdsfertgsa
        var decoded = new Buffer(encoded,'base64').toString('utf-8').split(":");
        var user = decoded[0];//user
        var pass = decoded[1];//password
        if(!checkUser(user,pass)){
            res.setHeader('WWW-Authenticate','Basic realm="Secure Area"');
            res.writeHead(401);
            res.end();

        } else{
            handle(req,res);
        }
    }
```


## 数据上传

>通过解析报头的Transfer-Encoding或Content-Length可以判断是否带有内容，如下

``` javascript

    var hasBody = function(req){
        return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
    }
    //如果存在
    function (req,res) {
        if(hasBody(req)){
            var buffers = [];
            req.on('data',function(chunk){
                    buffers.push(chunk);
                });
            req.on('end',function(){
                    req.rawBody = Buffer.concat(buffers).toString();
                    handle(req,res);
                })
        }else {
            handle(req,res);
        }
    }

```

## 表单数据

>默认的表单提交，请求头中的Content-Type字段值为application/x-www-form-urlencoded，可以通过如下进行解析判断

``` javascript

    var handle = function (req,res) {
        if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
            req.body = querystring.aprse(req.rawBody);
        }
        todo(req,res);
    }
```

## 其他格式

>默认的表单提交，请求头中的Content-Type字段值为application/xx， xx可以是json 或者xml,我们还得携带编码信息:
 - Content-Type:application/json;charset=utf-8
 - 于是做如下判断

``` javascript
var mime = function (req) {
    var str = req.headers['content-type'] || '';
    return str.split(";")[0]
};

```

> 解析json文件

``` javascript

    var handle = function (req,res) {
        if(mime(req) === 'application/json'){
            try {
                req.body = JSON.parse(req.rawBody);
            } catch (e) {
                res.writeHead(400);
                res.end("Invalid JSON");
                return;
            }
        }
        todo(req,res);
    }
```

>解析xml  需要引入第三方的库

``` javascript

    var xml2js = require('xml2js');
    if(mime(req) === 'application/xml'){
        xml2js.parseString(req.rawBody,function(err,xml){
                if(err) {
                    res.writeHead(400);
                    res.end('Invalid XML');
                    return;
                }
                req.body = xml;
                todo(req,res);
            })
    }

```

## 附件上传

>对于含file控件的特殊表单，我们需要这样构造请求
 - Content-Type:multipart/form-data; boundary=AaBO3x
 - Content-Length:19958

>boundary=AaBO3x是每一部分的边界符，它是随机生成的一段字符串，报体内容将在它前面添加--进行分割，报文结束都加上--表示结束，Content-Length的值必须保障是报文体的长度

>由于我们需要接受的文件大小不确定，所以我们需要谨慎处理

``` javascript

    function (req,res) {
        if(hasBody(req)){
            var done = function () {
                handle(req,res);
            }
             if(mime(req) === 'application/json'){
                parseJSON(req,done);
             } else if(mime(req) ==='application/xml'){
                parseXML(req,done)
             } else if(mime(req) === 'multipart/form-data') {
                parseMultipart(req,done);
             }
        }else {
            handle(req,res)
        }
    }
```

>最好的啊办法是用formidable模块

``` javascript
    
    var formidable = require('formidable');
    function (req,res) {
        if(hasBody(req)) {
            if(mime(req) === 'multipart/form-data') {
                var form = new formidable.IncomingForm();
                form.parse(req,function(err,fields,files){
                        req.body = fields;
                        req.files = files;
                        handle(req,res);
                    })
            }
        } else {
            handle(req,res);
        }
    } 
```


























