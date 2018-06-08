---
title: node.js深入浅出笔记2
date: 2017-08-26
tags: node
---
# node异步 I/O  

## 事件循环

> 进程启动时，node会创建一个类似于while(true)的循环，每次执行一次循环我们称为tick，每个tick过程就是查看是否有事件待处理，有就取出相关的回调函数，存在回调就执行，否则让进入下个循环


>如图所示

![流程图](https://aymfx.github.io/img/fileImage/day20170826.png)

## 观察者 

> 监听每个事件处理，需要一个或者多个观察者，有观察者确定事件是否要被处理。事件循环是一个典型的生产者/消费者模型,异步i/o，网络请求等则是事件的生产者，源源不断的提供node不同类型的事件，这些事件被传递到观察者哪里，事件循环则是从观察者哪里取出事件并且处理

> win 基于IOCP linux基于多线程


## 请求对象

> node中的异步i/o调用而言，回调函数不是由开发者调用，实际上是javascript发起调用到内核执行完i/o操作的过度产物中，存在一种中间产物，他叫做请求对象，所有状态都保存在这个对象中，包括送入线程池等待执行以及i/o操作完毕后的回调函数

## 执行回调 如图所示

![流程图](https://aymfx.github.io/img/fileImage/day2017082602.png)

> 事件循环 观察者 请求对象 I/O线程池共同构成了node异步i/o模型的基本要素

> 小结:JavaScript是单线程，但是node本身是多线程。除了用户自身的代码无法并行执行外，其他的i/o都是可以并行的

## 非I/O的异步API

> 他们是 setTimeout()  setInterval() setImmediate()  process.nextTick()

> setTimeout 与setInterval() 与浏览器api一致，他们不需要i/o线程池的参加,下面是图示

![流程图](https://aymfx.github.io/img/fileImage/day2017082603.png)

> process.nextTick(callback) 类似setTimeout 但是执行效率比较高


``` javascript
process.nextTick = function(callback){
    if(process._exiting) return;

    if(tickDepth >=process.maxTickDepth)
        maxTickWarn();
    var tock = {callback : callback}

    if(process.domain) tock.domain = process.domain;
    nextTickQueue.push(tock);
    if(nextTickQueue.length){
        process._needTickCallback();
    }
}


```

> setImmediate() 类似于process.nextTick() 都是将函数延迟执行

``` javascript

process.nextTick(function(){
    console.log("延迟执行");
})

console.log("正常执行");

//正常执行
//延迟执行


//两者的优先级

setImmediate(function(){
    console.log("延迟执行setImmediate");
})

process.nextTick(function(){
    console.log("延迟执行nextTick");
})



console.log("正常执行");

// 正常执行
// 延迟执行nextTick
// 延迟执行setImmediate
```

>事件循环是有先后顺序的 process.nextTick()属于idle观察者,setImmediate()属于check观察者  idle优于观察者i/o优于观察者check

> process.nextTick()回调函数保存在数组中，每轮循环回到函数全部执行完，而setImmediate()保存在链表中，每轮循环中执行链表中的一个回调函数  一下就是例子,好像不对，运行结果有问题啊

``` javascript

process.nextTick(function(){
    console.log("延迟执行nextTick1");
    
})


process.nextTick(function(){
    console.log("延迟执行nextTick2");
})

setImmediate(function(){
    console.log("延迟执行setImmediate1");

    process.nextTick(function(){
    console.log("我也执行l ");
})
})  

setImmediate(function(){
    console.log("延迟执行setImmediate2");
})



console.log("正常执行");

// 正常执行
// 延迟执行nextTick1
// 延迟执行nextTick2
// 延迟执行setImmediate1
// 延迟执行setImmediate2
// 我也执行l

```


## 事件驱动与高性能服务器

>利用node构建的服务器，基于以下实现

![流程图](https://aymfx.github.io/img/fileImage/day2017082604.png)















