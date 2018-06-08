---
title: node.js深入浅出笔记3
date: 2017-08-27
tags: node
---

# 异步编程

## 高阶函数

> 高阶函数可以把函数当成参数，或是将函数作为返回值的函数

``` javascript
    var points = [90,25,89,45,36,95,56,87];

    points.sort(function(a,b){
        return a-b;
        })

//通过改变不同的参数，可以决定排序方式
    
```

## 偏函数的用法

> 意思指的是:创建一个调用另外一个部分--参数或者变量已经预置的函数

``` javascript

    //解释一下

    var toString  = Object.prototype.toString;

    var isString = function(obj){
        return toString.call(obj) == '[object String]'
    }

    var isFunction = function(obj){
        return toString.call(obj) == '[object Function]'
    }


    //以上这样写会产生很多累赘的代码,按照一下方式就是偏函数的用法

    var isType = function(type){
    return function (obj){
        return toString.call(obj) == '[object'+type+']';
        }
    }
    var isString = isType('String');
    var isFunction = isType('Function');

```

## node 的事件驱动的非阻塞i/ o模型

>如图所示

![流程图](https://aymfx.github.io/img/fileImage/day2017082604.png)

## 异步编程的难点

> 异常处理的难点

 - 异步方法通常有两个阶段，一个是提交请求，异常并不一定发生在此处，try/catch的功效不会发挥功效，第二个是处理结果
 - node在处理异常有一种约定俗成的规定，即异常将作为回调函数第一个参数返回，如果为空值则没有异常
 - 我们在编写异步时遵循的原则
     - 必须执行调用者传入的回调函数
     - 正确传递回异常供调用者判断

``` javascript

    //示例代码

    var async = function(callback) {
    process.nextTick(function(){
        var results = something;
        if(error){
            return callback(error);
        }
        callback(null,results)
    });
}


```

> 函数嵌套过深

 - node多个异步调用

> 阻塞代码

 - 不能用sleep()使线程睡眠

> 多线程编程

 - 前端使用 web Workers 

![流程图](https://aymfx.github.io/img/fileImage/day2017082606.png)

> 异步转同步

## 异步编程的解决方案

### 事件发布/订阅模式

``` javascript
   //例子
   //订阅
   emmiter.on('event1',function(message){
    console.log(message);
    })
    //发布
    emmiter.emit('event1','i am ok')
```
### 多异步之间的协作方案

> 通过哨兵变量以及偏函数来解决

``` javascript

var after = function(times,callback){
    var count = 0 , results = {};
    retrun function(key,value) {
        results[key] = value;
        count++;
        if(count===times) {
            callback(results);
        }
    }
}

```

> 利用EventProxy模块实现自由订阅组合事件

``` javascript

    var proxy = new EventProxy();

    proxy.all('template','data','resource',function(template,data,resource){
        //TODO
    })

    fs.readFile('template_path','utf-8',function(err,template){
        proxy.emit('template',template);
    })

    db.query(sql,function(err,data){
        proxy.emit('data',data);
    })

    http.get(function(err,resource){
        proxy.emit('resource',resource)
    })

```

> all() 事件，只有当参数列表的数据都获取到才执行回调函数

> tail() 事件，只要满足一个参数条件，就可以执行

> after('data',10,callback) 事件 ,只有调用10次后才执行监听事件

### EventProxy代码

``` javascript

    trigger : function(eventName) {
        var list,calls.ev.callback,args;
        var both = 2;
        if(!(calls = this._callbacks)) return this;
        while(both--){
            ev = both ? eventName : 'all';
            if(list = calls[ev]) {
                for(var i = 0,l = list.length;i<l;i++){
                    if(!(callback = list[i])){
                        list.splice(i,1);i--;l--;
                    }else{
                        args = both ? Array.prototype.slice.call(arguments,1) : arguments;
                        callback[0].apply(callback[1] || this,args);
                    }
                }
            }
        }

        return this;


    }

```

EventProxy异常处理代码

``` javascript

    exports.getContent = function(callback){
    var ep = new EventProxy();
    ep.all('tpl','data',function(tpl,data){
        callback(null,{
            template:tpl,
            data:data
        })
    })

    //侦听异常
    ep.bind('error',function(err){
        ep.unbind();
        callback(err)
    })

    fs.readFile('template_tpl','utf-8',function(err,content){
        if(err){
            return ep.emit('error',err)
        }
        ep.emit('tpl',content)
    })

    db.get('some sql',function(err,result){
        if(err){
            return ep.emit('error',err);
        }

        ep.emit('data',result);
    })

}


//优化后

    ep.fail(callback);

    fs.readFile('template_path','utf-8',ep.done('tpl'));
    db.get('sql',ep.done('data'))

```


### Promise/Deferred模式

>Promise/A
 - 三种状态：未完成状态 完成状态 失败状态
 - 状态一旦变化不能被更改
 - 状态不能逆反，切完成态和失败状态不能相互转换
 
 ![流程图](https://aymfx.github.io/img/fileImage/day2017082607.png)

  - 可选择的将progress事件回调作为第三个方式
  - then()只接受function对象，其余对象被忽略
  - then()继续返回promise对象,以实现链式调用
  - then(fulfillhandle,errorHandler,progressHandler)参数:

> 简单的实现

``` javascript

   //将回调函数存放起来


    var Promise = function(){
        EventEmitter.call(this);
    }

    util.inherits(Promise,EventEmitter);

    Promise.prototype.then= function(fulfilledHandle,errorHandler,progressHandler){
        if(typeof fulfilledHandle ==='function') {
            this.once('success',fulfilledHandle);
        }

        if(typeof errorHandler === 'function') {
            this.once('error',errorHandler)
        }

        if(typeof progressHandler === 'function'){
            this.on('proress',progressHandler);
        }
        return this;
    }

```

``` javascript
   //deferred

   var Deferred = function(){
     this.state = 'unfulfilled';
     this.promise = new Promise();
   }

    Deferred.prototype.resolve = function(obj) {
        this.state = 'fulfilled';
        this.promise.emit('success',obj);
    }

    Deferred.prototype.reject = function (err) {
        this.state = 'failed';
        this.promise.emit('error',err);
    }

    Deferred.prototype.progress = function(data) {
        this.promise.emit('progress',err);
    }

```

### 没看懂，暂时跳过    研究下Q 和 when 库


## 流程控制库

> 非规范的流程控制库  https://github.com/senchalabs/connect


### 尾触发与next

> 需要手动调用才能持续执行后续调用的，我们将此称为尾触发 关键词 next

``` javascript

//connect 暴露api

var connect = require('connect');

var app = connect();
//中间件

app.use(connect.staticCache())
app.use(connect.static(_dirname+'/public'));
app.use(connect.cookieParser())
app.use(connect.session());
app.use(connect.query());
app.use(connect.bodyParser());
app.listen(30001)
```

>中间件利用了尾触发的机制,以下是最简单的中间件

```
function(req,res,next) {
    //中间件
}

```

>每个中间件传递请求对象，响应对象和尾触发函数，通过队列形成处理流 ，如图

![流程图](https://aymfx.github.io/img/a20170828/a1.png)

### connect核心实现

``` javascript

function createServer() {
    //创建了http服务器的request事件处理函数
    function app(req,res) {app.handle(req,res);}
    utils.merge(app,proto);
    utils.merge(app,EventEmitter.prototype);
    app.route = '/';
    //stack属性是这个服务器内部维护的中间件队列，代码在use()方法中提现
    app.stack = [];
    for(var i=0;i<arguments.length;++i){
        app.use(arguments[i])
    }
    return app;
}

```

### use()重要部分

``` javascript
    
    app.use = function(route,fn){
    //some coede 
    this.stack.push({route:route,handle:fn})

    return this;
    }

```

### 实现监听

``` javascript

app.listen = function () {
    var server = http.createServer(this);
    return server.listen.apply(server,arguments);
}

```

### app.handle(),每一个监听到的网络请求都将从这里开始处理

``` javascript
    app.handle = function(req,res,out) {
        next();
    }

```

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           





