---
title: node.js深入浅出笔记14
date: 2017-09-13 11:46:58
tags: node
---

# 基础功能

>由于node只提供了基础的功能，还远远达不到业务的需求

## 请求方式的判断

``` javascript
    //改造请求方式
    function (req,res) {
    switch (req.method){
        case "POST" : update(req,res);
            break;
        case "DELETE" : remove(req,res);
            break;
        case "PUT" : create(req,res);
            break;
        case "GET" :
        default : get(req,res);
    }
}
```

## 路劲解析

>常用处理路劲进行业务处理的是静态文件服务器，处理方式如下

``` javascript
    
    function(req,res) {
    var pathname = url.parse(req.url).pathname;
    fs.readFile(path.join(ROOT,pathname),function(err,file){
        if(err){
            res.writeHead(404);
            res.end('找不到文件')
            return;
        }
        res.writeHead(200);
        res.end(file);
    })
}
```

>还有一种常见分发场景是根据路径来选择控制器，他预设路径为控制器和行为的组合，无需额外配置路由信息
 - /controller/action/a/b/c

>这里的controller会对应一个控制器,action对应控制的行为，剩余的值会作为参数，处理方式如下

``` javascript
        function (req,res) {
        var pathname = url.parse(req.url).pathname;
        var paths = pathname.split('/');
        var controller = paths[1] || 'index';
        var action = paths[2] || 'index';
        var args = paths.slice(3);
        if(handles[controller] && handles[controller][action]) {
            handles[controller][action].apply(null,[req,res].concat(args));
        }else{
            res.writeHead(500);
            res.end('找不到响应控制器')
        }
    }

    //这样我们只要只关心具体的业务的实现

    handles.index = {};

    handles.index.index = function(req,res,foo,bar){
        res.writeHead(200)
        res.end(foo);
    } 
```

## 查询字符串

>通过querystring模块处理部分数据

``` javascript

    var url = require("url");
    var querystring = require('querystring');
    var query = queststring.parse(url.parse(req.url).query);

    //更简单的方式
    var query = url.parse(req.url,true).query;
```

## Cookie
> cookie的处理方式
 - 服务器向客户端发送cookie
 - 浏览器将cookie保存
 - 之后每次浏览器都会将cookie发向服务器端

>cookie的解析方式

``` javascript

var parseCookie = function (cookie) {
    var cookies = {};
    if(!cookie){
        return cookies;
    }
    var list = cookie.split(';');
    for(var i = 0 ;i<list.length;i++){
        var pair = list[i].split("=");
        cookies[pair[0].trim()] = pair[i];
    }

    return cookies;
}

//直接访问如下

function(req,res) {
    req.cookies = parseCookie(req.headers.cookie);
    hande(req,res);
}

```

>服务器告诉客户端的方式是通过设置Set-Cookie字段
 - Set-Cookie:name=value;Path=/;Expires=Sun,23-Apr-23 09:01:35 GMT;Domian=.domain.com;

>上述的字符串的意思
 - path:表示cookie影响的路径
 - Expires和Max-Age用来告诉cookie过期时间
 - HttpOnly:表示脚本是否可以通过document.cookie访问
 - Secure:当值为true时，表示必须通过https访问

>将cookie转换成规范格式

``` javascript
var serialize = function (name,val,opt) {
    var pairs = [name+'='+encode(val)];
    opt = opt || {};
    if(opt.maxAge){pairs.push('Max-Age='+opt.maxAge)};
    if(opt.domain){pairs.push('Domain='+opt.domain)};
    if(opt.path){pairs.push('Path='+opt.path)};
    if(opt.expires){pairs.push('Expires='+opt.expires.toUTCString())};
    if(opt.httpOnly){pairs.push('httpOnly')};
    if(opt.secure){pairs.push('secure')};

    return pairs.join(';')
}

```

>cookies的性能影响
 - 减小Cookie的大小
 - 为静态组件使用不同的域名
 - 减少dns查询

## Session
> 由于cookie安全性问题，就诞生了session,它能保证数据有一定的安全性，常见有两种方式实现

 - 基于Cookie来实现用户和数据的映射,将口令保存在cookie上，上代码

``` javascript

var sessions  = {}；
var key = 'session_id';
var EXPIRES = 20*60*1000;

var generate = function () {
    var session = {};
    session.id = (new Date()).getTime()+Math.random();
    session.cookie = {
        expire:(new Date).getTiem()+EXPIRES
    }
    session[session.id] = session;
    return session;
}

//每个请求到来时，检查cookie中的口令与服务端的数据，如果过期重新生成

function(req,res) {
    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        var session = sessions[id];
        if(session) {
            if(session.cookie.expire > (new Date().getTime()) {
                //更新超时时间
                session.cookie.expire = (new Date()).getTime() + EXPIRES;
                req.session = session;
            } else {
                //超时了，删除旧数据，并重新生成
                delete session[id];
                req.session = generate();
            }
        } else {
            //如果session过期或者口令不对，重新生成session
            req.session = generate();
        }
    }
        handle(req,res)
}

//当然仅仅重新生成Session还不足以完成整个流程，还要在响应给客户端时设置新的值，以便下次请求时能够对应服务器数据，这里我们hack响应的对象writeHead()方式，在它的内部注入设置Cookie的逻辑、

var writeHead = res.writeHead;
res.writeHead = function() {
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize('Set-Cookie',req.session.id);
    cookie = Array.isArray(cookies) ? cookie.concat(session) : [cookies,session];
    res.setHeader('Set-Cookie',cookies);
    return writeHead.apply(this,arguments)
}

//我们现在只需写如下所示

var hadle = function (req,res) {
    if(!req.session.isVisit) {
        res.session.isVisit = true;
        res.writeHead(200);
        res.end('欢迎第一次光临小屋')

    } else {
        res.writeHead(200);
        res.end("欢迎再次光临");
    }
}
```
 - 通过查询字符串来实现浏览器端与服务端数据的对应

``` javascript
    //原理是通过检查请求的查询字符串，如果没有值，会先生成新的带值得url，如下
    var getURL = function (_url,key,value) {
        var obj = url.parse(_url,true);
        obj.query[key] = value;
        return url.format(obj);
    };
    //然后跳转，让客户端重新发起请求

    function (req,res) {
        var redirect = function (url) {
            res.setHeader('Location',url);
            res.writeHead(302);
            res.end();
        };

        var id = req.query[key];
        if(!id) {
            var session = generate();
            redirect(getURL(req.url,key,session.id));
        } else{
            var session = session[id];
            if(session) {
                if(session.cookie.expire > (new date()).getTime()) {
                    //更新超时时间
                    session.cookie.expire = (new Date()).getTime()+EXPIRES;
                    req.session = session;
                    handle(req,res)
                }else {
                    //超时了，删除旧数据，并且重新生成
                    delete session[id];
                    var session = generate();

                    redirect(getURL(req.url,key,session.is));
                }
            }else {
                //如果session过期或者口令不对，重新生成session
                var session = generate();
                redirect(getURL(req.url,key,session.id))
            }
        }
    }
```
> session与内存，由于node的内存限制，我们一般采用第三方进行缓存，于是需要重新改写代码

``` javascript

function(req,res) {
    var id = req.cookie[key];
    if(!id){
        req.session = generate();
    }else{
        store.get(id,function(err,session){
                 if(session) {
                if(session.cookie.expire > (new Date().getTime()) {
                    //更新超时时间
                    session.cookie.expire = (new Date()).getTime() + EXPIRES;
                    req.session = session;
                } else {
                    //超时了，删除旧数据，并重新生成
                    delete session[id];
                    req.session = generate();
                }
            } else {
                //如果session过期或者口令不对，重新生成session
                req.session = generate();
            }
             handle(req,res)
        })  
    } 
}

//在响应时，将新的session保存会缓存中，如下所示

var writeHead = res,writeHead;
res.writeHead = function () {
    var cookies = res.getHeader('Set-Cookie');
    var session = serialize('Set-Cookie',req.session.id);
    cookies = Array.isArray(cookies) ? cookies.concat(session) : [cookies,session];
    res.setHeader('Set-Cookie',cookies);
    //保存回缓存
    store.save(req.session)
    return writeHead.apply(this,arguments)
}

```
> Session 与 安全
 - xss 攻击


















