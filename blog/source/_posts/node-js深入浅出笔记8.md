---
title: node.js深入浅出笔记8
date: 2017-09-05 13:47:47
tags: node
---

# 高效使用内存

## 作用域

> 和JavaScript一样，按照作用域链查找元素标识符，对于内存来讲，当最外层的函数或者变量，一旦失去作用，局部的变量和函数就要被回收

## 变量的主动释放

> 对于定义在全局上面的对象或者变量，我们需要手动清除

``` javascript

    var a = 'i am global';
    var b = {
        user:'ly'
    }

    //通过delete
    delete a;
    //也可以设置为null或者undefind
    b=null;
```

## 闭包

> 先看下典型的闭包函数吧

``` javascript
    
    var s = function(){
        var name = "ly";
        return function(){
            console.log(name+' like  eat meat');
        }
    }

    s()();
```

> 本来 name 是s下面的局部变量，我们在外部访问不到，但是由于s返回的是一个匿名对象，于是我们的s函数在执行完毕，不会消失，name也不会消失，于是通过返回的函数，我们间接的访问了局部变量，于是呢，内存占用着。

# 内存指标

## 查看内存使用情况

 - os模块的totalmem() 和freemem()可以查看
 
 ``` javascript

var a = require('os');
undefined

//totalmem()
a.totalmem()
8540053504

//freemem()

a.freemem()
4428193792

 ```
 - process.memoryUsage()

``` javascript
    
 process.memoryUsage()
    { rss: 21786624,
      heapTotal: 8425472,
      heapUsed: 4790112,
      external: 9187 }

```

> rss是resident set size 的缩写，即常驻内存的部分，进程的内存总共有几部分，一部分是rss，其余部分在交换区（swap）或者文件系统(filesystem)中

``` javascript

    //展示我们内存的使用量

    var showMem = function(){
        var mem = process.memoryUsage();
        
        var format = bytes => ((bytes/1024/1024).toFixed(2)+'MB');
        console.log("内存总量："+format(mem.heapTotal)+" 内存使用量："+format(mem.heapUsed)+" rss:"+format(mem.rss));
        console.log('-----------------------------------------------------------------------------');
    }

    var useMem = function(){
        var size = 1024*20*1024;
        var arr = new Array(size);
        for(var i=0; i<size;i++){
            arr[i] = 0;
        }

        return arr;
    };

    var total = [];

    for(var j=0;j<15;j++){
        showMem();
        total.push(useMem());
    }

//当我们把 var arr = new Array(size); 变成 var arr = new Buffer(size);,我们可以看到rss变的很大，并且没有中断程序。因为Buffer不属于v8管，因为i/o的v8管不住啊

```

# 内存泄露

> 主要的三个原因

 - 缓存
 - 队列消费不及时
 - 作用域未释放

## 慎将内存当做缓存

 >两个问题

 - 当一个对象被命中作为缓存来使用的话，他将会常驻老生代，缓存中储存的键越多，存活的对象就越多，这将导致垃圾回收，对这些对象做无用功
 - 当使用对象的键值对缓存东西，因为普通的对象不想缓存一样有过期策略，所以也会造成内存泄露

> 缓存的限制策略
 - 就是设置一个缓存的上限，使得内存不会溢出
 - 详细方法参见书吧

> node解决缓存的方案是采用外部的缓存软件，它具有良好的缓存过期淘汰策略以及自有的内存管理主要解决了一下两个问题
 - 将缓存转移到外部，减少常驻内存的对象数量，让垃圾回收更高效
 - 进程间可以共享缓存

## 关注队列状态
>队列产生的原因，当事件处理的速度低于产生事件的速度，这就会形成堆积

>解决方案
 - 异步超时机制
 - 还有就是拒绝模式。当队列拥塞时

## 内存泄露排查
> 通过node-heapdump以及node-memwatch两种方式进行排查

>注意：用上面两款工具需要安装pyhton程序


# 大内存的应用

> stream模块用于处理大文件





