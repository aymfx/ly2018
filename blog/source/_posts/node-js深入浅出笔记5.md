---
title: node.js深入浅出笔记5
date: 2017-08-30 13:41:53
tags: node 
---
# Step 轻量级的流程控制库

> 只提供一个接口

``` bash
    Step(task1,task2,task3);
```

> 示例代码

``` javascript

Step(function readFile(){
        fs.readFile('file1.txt','utf-8',this);
    },
    function readFile2(err,content){
        fs.readFile('file2.txt','utf-8',this);
    },
    function done(err,content) {
        console.log(content);
    }
    )

```

> this 是Step内部的一个next()方法,将异步调用的结果传递给下一个任务作为参数，并调用执行

## 并行任务执行

> this有一个parallel()方法，可以告诉Step,需要等待所有任务结束才执行下一个任务

``` javascript
var Step = require('step');
var fs = require('fs');
Step(function readFile(){
    fs.readFile('file1.txt','utf-8',this.parallel());
    fs.readFile('file2.txt','utf-8',this.parallel());
    fs.readFile('file3.txt','utf-8',this.parallel());
},
function done(err,content1,content2,content3){
    console.log(arguments);
}
)

```

>书上说异步方法的结果传回的是多个参数，step将只会取前两个参数（不懂）

``` javascript

var asyncCall = function(callback){
    process.nextTick(function(){
        callback(null,'result1','result2')
        })
}

//调用paraller()时，result2将会被丢弃
```

> Step的parallel()方法原理:每次执行时将内部的计数器加1,然后返回一个回调函数，这个回调函数在异步调用结束时才执行。当回调函数执行时，将计数器减1,当计数器为0时，告知所有的异步调用结束，Step执行下一个方法

## 结果分组 group

> 看下示例代码基本能明白


``` javascript

Step(
        function readDir(){
            fs.readdir(_dirname,this);
        },
        function readFiles(err,results){
            if(err) throw err;
            var group = this.group();

            results.forEach(function(filename){
                if(/\.js$/.test(filename)){
                    fs.readFile(_dirname+'/'+filename,'utf-8',group())
                }
            });
        },
        function showAll(err,files){
            if(err) throw err;
            console.log(files);
        }
    )

```

# wind

>也是一个y异步的流程库，咱们中国人写的，做异步动画挺好的样子，我们来实现下异步动画排序的过程，先看看过程，再讲方法

``` javascript

var compare = function(x,y){
    return x-y;
}

var swapAsync = eval(Wind.compile('async',function(a,i,j){
    $await(Wind.Async.sleep(20));//休息20毫秒

    var t =a[i];
    a[i] = a[j];
    a[j] = t;
    paint(a);
}))

var bubbleSort = eval(Wind.compile('async',function(array){
        for(var i=0;i<array.length;i++){
            for(var j=0;j<array.length-i-1;j++){
                if(compare(array[j],array[i])>0){
                    $await(swapAsync(array,j,j+1))
                }
            }
        }
}))

    
```

> eval(Wind.compile('async',function(){}))

 - Wind.compile()将普通的函数进行编译
 - eval()执行代码
 
> Wind.Async.sleep()

 - 内置了对setTimeout()的封装

>$await()

 - 它不是一个方法，只是一个等待的占位符，告诉编译器需要等待
 - 他接受一个任务对象，表示任务结束才能继续执行，每个异步任务都可以转化为一个任务，wind正是基于任务模型实现的，这是一个将fs.readFile()调用转换成一个任务模型

``` javascript

    var Wind = require('wind');
    var Task = Wind.Async.Task;

    var readFileAsync = function(file,encoding){
        return Task.create(function(t){
                fs.readFile(file,encoding,function(err.file){
                    if(err) {
                        t.complete('failure',err);
                    } else {
                        t.complete('success',file);
                    }
                    })
            })
    }

```

> Wind串行展示

``` javascript

var serial = eval(Wind.compile('async',function(){
     var file1 = $await(readFileAsync('file1.txt','utf-8'));
     console.log(file1);
     var file2 = $await(readFileAsync('file2.txt','utf-8'));
     console.log(file2);
     try{
        var file3 = $await(readFileAsync('file3.txt','utf-8'))
     } catch(err){
        console.log(err)
     }
}))

serial().start();

//file1 file2 error
```

> 并行效果展示

``` javascript

    var parallel = eval(Wind.compile('async',function(){
        var results = $await(Task.whenAll({
            file1:readFileAsync('file1.txt','utf-8');
            file2:readFileAsync('file2.txt','utf-8');
        }))
        console.log(results.file1,results.file2);
    }))

    parallel().start();

```

> Wind好似同步编程的感觉，但是我们需要做一些麻烦的操作。





