---
title: node.js深入浅出笔记16
date: 2017-09-26 10:25:38
tags: node
---

# 路由解析

## 文件路径型

 - 静态文件

>最简单的方式，直接就是url路径与网站目录的路径一致

 - 动态文件

> 动态解析后缀不同的文件

## MVC

 - 路由解析，根据url寻找对应的控制器和行为
 - 行为调用相关的模型，进行数据操作
 - 数据操作结束后，调用视图和相关数据进行页面渲染，输出到客户端

![流程图](https://aymfx.github.io/img/a20170925/a2.png)

## RESTful  全称:Representational State Transfer 表现层状态转化

>它的规范就是通过请求方式来判断用户需要做什么事

``` javascript

    var routes = {'all':[]};
    var app = {};
    app.use=function (path,action) {
        routes.all.push([pathRegexp(path),action]);
    }
    ['get','put','delete','post'].forEach(function(method){
            routes[method] = {};
            app[method] = function (path,action) {
                routes[method].push([pathRegexp(path),action])
            }
        })
```

# 中间件

>中间件的功能类似于细节的封装，我们只关注具体的业务逻辑

![流程图](https://aymfx.github.io/img/a20170925/a2.png)

``` javascript
    
    //基础的写法
    app.use('/user/:username',querystring,cookie,session,function(req,res){
            //TODO
        })
    //这里的中间件指的是-->querystring,cookie,session

    //例子 querystring

    var querystring = function (req,res,next) {
        req.query = url.parse(req.url,true).query;
        next();
    }

    //cookie

    var cookie = function (req,res,next) {
        var cookie = req.headers.cookie;
        var cookie = {};
        if(cookie) {
            var list = cookie.split(";");
            for(var i=0;i<list.length;i++) {
                var pair = list[i].split('=');
                cookies[pair[0].trim()] = pair[1];
            }
        }

        req.cookies = cookies;
        next();
    }


    //改进use()方法

    app.use = function (path) {
        var handle = {
            //第一个参数作为路径
            path:pathRegexp(path),
            stack:Array.prototype.slice.call(arguments,1)
        };
        routes.all.push(handle);
    };

    //把所有中间件放进stack数组中保存，更改匹配方法

    var match = function (pathname,routes) {
        for(var i=0;i<routes.length;i++) {
            var route = routes[i]
            //进行正则匹配
            var reg = route.path.regexp;
            var matched = reg.exec(pathname);
            if(matched) {
                //抽取具体，省略代码，将中间件数组交给handle()方法处理
                handle(req,res,route.stack);
                return true;
            }
        }
        return false;
    }

    //当匹配成功时会交给handle方法处理，该方法封装后，递归的执行数组中的中间件，每个中间件执行完成后，按照约定传入next()方法触发下一个中间件执行

    var handle = function (req,res,stack){
        var next = function(){
            var middleware = stack.shift();
            if(middleware) {
                middleware(req,res,next)
            }
        }

        next();
    }

    //不过这样写太复杂，有比较简单的写法

    app.use(xxx)  xxx 为某中间件

    //我们为了适应参数的变化，设计如下

    app.use = function (path) {
        var handle;
        if(typeof path === "string") {
            handle = {
                //第一个参数作为路径
                path:pathRegexp(path),
                //其他的都是处理单元
                stack:Array.prototype.slice.call(arguments,1)
            }
        } else {
            handle = {
                //第一个参数作为路径
                path:pathRegexp('/'),
                //其他的都是处理单元
                stack:Array.prototype.slice.call(arguments,0)
            }
        }
        
        routes.all.push(handle);
    }

    //为保证后续匹配继续处理逻辑，我们需要改变匹配过程

    var math = function (pathname,routes) {
        var stacks = [];
        for(var i=0;i<routes.length;i++) {
            var route = routes[i];
            var reg = route.path.regexp;
            var matched = reg.exec(pathname);
            if(matched) {
                //抽取具体值
                //代码省略
                //将中间件保存起来
                stacks = stacks.concat(route.stack);
            }
        }
        return stacks;
    }

    //改进分发过程

    function (req,res) {
        var pathname = url.aprse(req.url).pathname;
        //将请求方法变为小写
        var method = req.method.toLowerCase();
        //获取all()方法里的中间件
        var stacks = match(pathname,routes.all)

        if(routes.hasOwnPerperty(method)) {
            //根据请求方法分发，获取相关的中间件
            stacks.concat(match(pathname,routes[method]))
        }

        if(stacks.length) {
             handle(req,res,stacks);
        } else {
            handle404(req,res)
        }
    }

```


## 中间件异常处理

``` javascript

    var handle = function (req,res,stack) {
        var next = function (err) {
            if(err) {
                return handle500(err,req,res,stack);
            }
            //stack数组中取出中间件并执行
            var middleware = stack.shift();
            if(middleware) {
                //传入next()函数自身，使中间件能家属后进行递归
                try{
                    middleware(req,res,next);
                } catch (ex) {
                    next(err)
                }
            }
        }

            next();
    }

    //由于异步不能直接捕获，需要中间件自己传递出来

    var session = function (req,res,next) {
        var id =req.cookies.sessionid;
        store.get(id,function(err,session){
                if(err) {
                    return next(err)
                }
                req.session = session;
                next();
            })
    }

    //处理异常的中间件设计
    
    var handle500 = function(err,req,res,stack) {
        //选取异常处理中间件
        stack = stack.filter(function(middleware) {
                return middleware.length === 4;
            })
        var next = function () {
            //从stack数组中取出中间件并执行
            var middleware = stack.shift();
            if(middleware) {
                //传递异常对象
                middleware(err,req,res,next);
            }
        }

        next();
    }


```






