---
title: node.js深入浅出笔记4
date: 2017-08-29 09:38:50
tags: node
---

# 异步编程 async

## 异步的串行执行，通过series ()实现

``` javascript
    var fs = require('fs');
    var async = require('async');
    async.series([
    function (callback) {
        fs.readFile('file1.txt','utf-8',callback)
    },
    function (callback) {
        fs.readFile('file2.txt','utf-8',callback)
    },
    ],function(err,results){
        console.log(results,'哈哈');
    })

```

> 等价于

``` javascript

fs.readFile('file1.txt','utf-8',function(err,content){
    if(err){
        return callback(err)
    }
    fs.readFile('file2.txt','utf-8',function(err,data){
        if(err){
            return callback(err);
        }
        callback(null,[content,data])
    })
})

```

> 每个callback()执行的结果都将保存起来，然后执行下一个调用，直到结束所有调用，最终执行的回调函数将把前几次异步调用的结果以数组的形式传入，异常处理规则是，一旦出现异常，结束所有调用，并将异常传递给最终回调的第一个参数(啥意思？？)，好像是那个啥，回到调用成功的阶段。


## 异步的并行执行parallel

``` javascript

var fs = require('fs');
var async = require('async');

async.parallel([
        function(callback) {
            fs.readFile('file1.txt','utf-8',callback);
        },
        function(callback) {
            fs.readFile('file2.txt','utf-8',callback);
        }
    ],function(err,results){
        console.log(results);
    })

```

>等价于

``` javascript

var counter = 2;
var results =[];

var done = function(index,value) {
    results[index] = value;
    counter--;
    if(counter ===0) {
        callback(null,results);
    }
}

//只传递一个异常

var hasErr = false;

var fail = function(err) {
    if(!hasErr){
        hasErr = true;
        callback(err);
    }
}

fs.readFile('file1.txt','utf-8',function(err,content){
    if(err){
        retunr fail(err)
    }
    done(0,content)
})

fs.readFile('file2.txt','utf-8',function(err,content){
    if(err){
        retunr fail(err)
    }
    done(1,content)
})


```

>也类似于

``` javascript
var EventProxy = require('eventproxy');

var proxy = new EventProxy();

proxy.all('content','data',function(content,data){
    callback(null,[content,data]);
})

proxy.fail(callback);
fs.readFile('file1.txt','utf-8',proxy.done('content'));
fs.readFile('file2.txt','utf-8',proxy.done('data'));

```

## 异步调用的依赖处理waterfall

> 当前一个结果是后一个结果的输入时，可以用waterfall

``` javascript

    var fs = require('fs');
    var async = require('async');

    async.waterfall([
    function(callback){
        fs.readFile('file1.txt','utf-8',function(err,content){
            callback(err,content)
        })
    },
    function(arg1,callback){
        //arg1 => file2.txt
        fs.readFile(arg1,'utf-8',function(err,content){
            callback(err,content)
        })
    },
    function(arg1,callback){
        //arg1 => file3.txt
        fs.readFile(arg1,'utf-8',function(err,content){
            callback(err,content);
        })
    }
    ],function(err,results){
        console.log(results);
    }
    )

```

> 也等价于

``` javascript

  fs.readFile('file1.txt','utf-8',function(err,data1){
    if(err){
        return callback(err)
    }
    fs.readFile('file2.txt','utf-8',function(err,data2){
        if(err){
        return callback(err)
    }
    fs.readFile('file3.txt','utf-8',function(err,data3){
        if(err){
            return callback(err);
        }
        callback(null,data3)
    }
    })
})  


```







