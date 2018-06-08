---
title: node.js深入浅出笔记6
date: 2017-08-31 09:38:06
tags: node 
---

# 异步并发控制

> 当我们同时发起很多请求时，产生的并发量过大，会导致下层服务器吃不消，我们需要做一点过载保护措施

## bagpipe的解决方案
 - 通过一个队列来控制并发量
 - 如果当前调用发起的但为执行的异步调用量小于限定值，从队列中取出执行
 - 如果活跃调用达到限定值，调用暂时存放在队列中
 - 每个异步调用结束时，从队列中取出新的异步调用执行
 
> 眼见为实 -->

``` javascript

var Bagpipe = require('bagpipe');

// 设置并发数为10

var bagpipe = new Bagpipe(10);

for(var i=0;i<100;i++) {
    bagpipe.push(async,function(){
        //异步回调
    })
}

bagpipe.on('full',function(length){
    consoel.warn("底层系统不能及时处理，待处理长度为:"+length);
})

```

>上文push()方法核心实现，假设第一个参数是方法最后一个是回调函数，其余为其他参数,虽然看不懂，但是大神的代码也可以敲一敲，没准就通了

``` javascript

Bagpipe.prototype.push = function(method) {
    var args = [].slice.call(arguments,1);
    var callback = args[args.length - 1];
    if(typeof callback !=='function'){
        args.push(function(){})
    }
    if(this.options.disabled || this.limt <1 ) {
        method.apply(null,args);
        return this;
    }

    // 队列长度也超过限制长度时
    if(this.queue.length < this.queueLength || !this.options.refuse) {
        this.queue.push({
            method:method,
            args:args
        })
    } else{
        var err = new Error('Too much async call in queue');
        err.name = 'TooMuchAsyncCallError';
        callback(err);
    }

    if(this.queue.length >1){
        this.emit('full',this.queue.length);
    }

    this.next();
    return this;
}


```

>将调用推入队列后，调用一次next()方式触发，next()定义如下

``` javascript

// 继续执行队列中的后续动作
Bagpipe.prototype.next = function(){
    var that =this;
    if(that.active < that.limit && that.queue.length) {
        var req = that.queue.shift();
        that.run(req.method,req.args);
    }
}

```

> next()主要判断活跃调用的数量,如果正常调用内部的run()正真调用。这是为了判断回调函数是否执行

``` javascript

Bagpipe.prototype.run = function(method, args) {
    var that = this;
    that.active++;
    var callback = args[args.length - 1];
    var timer = null;
    var called = false;

    //注入逻辑
    args[args.length - 1] = function(err) {
        //清除定时器
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    //如果超时就不执行

    if (!called) {
        that._next();
        callback.apply(null, arguments);
    } else {
        if (err) {
            that.emit('outdated', err);
        }
    }
    var timeout = that.options.timeout;
    if (timeout) {
        timer = setTimeout(function() {
            //set called as true
            called = true;
            that._next();
            var err = new Error(timeout + 'ms timeout');
            err.name = 'BagpipeTimeoutError';
            err.data = {
                name: method.name,
                method: method.toString(),
                args: args.slice(0, -1)
            }
            callback(err)
        }, timeout)
    }

    method.apply(null,args)

};


```

> 毕竟太多请求也是不行的，等待时间过长，所以我们可以加入拒绝模式

``` javascript
var bagpipe = new Bagpipe(10,{
    refuse:true
    })
```

>超时控制，保证一些代码不会异步调用耗时太久出问题

``` javascript
var bagpipe = new Bagpipe(10,{
    timeout:3000
    })
```

# async的解决方案

> async 处理异步调用的限制   parallelLimit()

``` javascript

async.parallelLimit([
    function(callback) {
        fs.readFile('file1.txt','utf-8',callback);
    },
    function(callback) {
        fs.readFile('file2.txt','utf-8',callback);
    }
    ],1,function(err,results){
        //做点啥
    })

```

>通过queue()可以实现动态添加并行任务

``` javascript
var q = async.queue(function(file,callback){
    fs.readFile(file,'utf-8',callback);
},2)
q.drain = function (){
    //完成了队列的所有任务
}

fs.readdirSync('.').forEach(function(file){
    q.push(file,function(err,data){
        //做点啥啊  
    })
})

```



 




