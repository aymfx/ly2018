---
title: node.js开发指南笔记2
date: 2017-08-11 17:22:08
tags: node 
---

# Node.js核心模块

> 核心模块是 Node.js 的心脏，它由一些精简而高效的库组成，为 Node.js 提供了基本的

# 全局对象global

> node的全局对象是Global Object 它满足以下的条件

 - 在最外层定义的变量
 - 全局对象的属性
 - 隐式定义的变量(未定义直接赋值的变量)

> tips:在定义变量一定要使用var定义


# process 

> 它用于描述当前 Node.js 进程状态
的对象，提供了一个与操作系统的简单接口

 - peocess.argv 第一个元素是 node， 第二个元素是脚本文件名，
从第三个元素开始每个元素是一个运行参数
 - process.stdout 标准输出流，通常我们使用的  console.log() 向标准输出打印
字符，而  process.stdout.write() 函数提供了更底层的接口

``` javascript
    process.stdout.write("你的表演");
```
 -  process.stdin 是标准输入流，初始时它是被暂停的，要想从标准输入读取数据，
你必须恢复流，并手动编写流的事件响应函数

``` javascript
    process.stdin.resume();

    process.stdin.on('data',function(){
        process.stdout.write('开始')
    })

    process.stdin.emit('data');
```
 -  process.nextTick(callback) 的功能是为事件循环设置一项任务，Node.js 会在
下次事件循环调响应时调用  callback

```javascript

    function doSomething(args,callback){
        firsthing();
        process.nextTick(callback);
    }

    doSomething(process.argv,function onEnd(){
          compute();
    })



    function firsthing(){
            setTimeout(function(){
                console.log("我出来了");
            },3000);
    }


    function compute(){
          setTimeout(function(){
                console.log("来呀");
          },10000)
    }


```
 -  process.platform
 -  process.pid
 -  process.execPath
 -  process.memoryUsage()

``` javascript
    console.log(process.platform); //win32
console.log(process.pid); //9356
console.log(process.execPath); //C:\Program Files\nodejs\node.exe
console.log(process.memoryUsage());//{ rss: 18862080,heapTotal: 7376896,heapUsed: 3260136,external: 8380 }  


```
 - POSIX表示可移植操作系统接口（Portable Operating System Interface of UNIX，缩写为 POSIX ），POSIX标准定义了操作系统应该为应用程序提供的接口标准，是IEEE为要在各种UNIX操作系统上运行的软件而定义的一系列API标准的总称，其正式称呼为IEEE 1003，而国际标准名称为ISO/IEC 9945。


# 常用的工具集合util

> util  是一个 Node.js 核心模块，提供常用函数的集合，用于弥补核心 JavaScript 的功能过于精简的不足

> util.inherits 实现一个对象间原型继承的函数

```javascript
    var util = require('util');

    function Base() {
        this.name = "base";
        this.base = "1995";

        this.sayHello = function(){
            console.log('Hello'+this.name);
        }
    }

    Base.prototype.showName = function() {
        console.log(this.name);
    }

    function Sub() {
        this.name = "sub"
    }

    util.inherits(Sub, Base);

    var objBase = new Base();

    objBase.showName();

    objBase.sayHello();

    console.log(objBase);

    console.log("---------------------------");

    var objSub = new Sub();

    objSub.showName();
    // objSub.sayHello(); 只能继承原型的东西，构造函数内部东西不能被继承
    console.log(objSub);
```

> util.inspect(object,[showHidden],[depth],[colors])

 - object ：要转换的对象
 - showHidden  是一个可选参数，如果值为  true ，将会输出更多隐藏信息
 - depth  表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多
少。如果不指定 depth ，默认会递归2层，指定为  null  表示将不限递归层数完整遍历对象。
 - 如果 color 值为  true ，输出格式将会以 ANSI 颜色编码，通常用于在终端显示更漂亮
的效果

``` javascript
    var util = require('util');
    var obj ={
         name:'ly',
         hello:function(){
            console.log("再见");
         }
    }

    console.log(util.inspect(obj)); //{ name: 'ly', hello: [Function: hello] }

    console.log(util.inspect(obj,true)); //{ name: 'ly',hello:{ [Function: hello] [length]: 0,[name]: 'hello',[arguments]: null,[caller]: null,[prototype]: hello { [constructor]: [Circular] } } }

    console.log(util.inspect(obj,true,4,true)); 

```

> 四个类型测试工具
 - util.isArray()
 - util.isRegExp()
 - util.isDate()
 - util.isError()

``` javascript
    <!-- 算了不测了都被废弃了 -->

```

> 格式化以及调试工具
 -  util.format()
 -  util.debuglog()

``` javascript
    
    const util = require('util');
    const debuglog = util.debuglog('foo');
    debuglog('hello from foo [%d]', 123);
    <!-- 很少用的感觉 -->
```

# 事件驱动 events
> Node.js 本身架构就是事件式
的，而它提供了唯一的接口，所以堪称 Node.js 事件编程的基石。 events 模块不仅用于用户代码与 Node.js 下层事件循环的交互，还几乎被所有的模块依赖。

> 事件发射器

 - EventEmitter.on(event, listener)  为指定事件注册一个监听器，接受一个字
符串  event  和一个回调函数  listener 
 - EventEmitter.emit(event, [arg1], [arg2], [...]) 发射  event  事件，传
递若干可选参数到事件监听器的参数表
 - EventEmitter.once(event, listener)  为指定事件注册一个单次监听器，即
监听器最多只会触发一次，触发后立刻解除该监听器。
 - EventEmitter.removeListener(event, listener) 移除指定事件的某个监听
器， listener  必须是该事件已经注册过的监听器
-  EventEmitter.removeAllListeners([event]) 移除所有事件的所有监听器，
如果指定  event ，则移除指定事件的所有监听器
-   setMaxListeners(n) 设定最大监听数，不能超过10个

``` javascript
    
var events = require('events');

var emitter = new events.EventEmitter();

emitter.on('someEvent',function(arg1,arg2){
    console.log('listener1',arg1,arg2);
});

emitter.on('someEvent',function(arg1,arg2){
    console.log('listener2',arg1,arg2);
});

emitter.emit('someEvent',"ly",1995);
// listener1 ly 1995
// listener2 ly 1995

console.log("----------移除绑定事件-----------------")
// 移除绑定事件

var s=function(arg1,arg2){
    console.log('listener1',arg1,arg2);
}

emitter.on('add',s)

emitter.emit('add',"ly",1996);

emitter.removeListener("add",s);



emitter.emit('add',"ly",1996);

console.log("----------结束-----------------")


console.log("----------只触发一次的函数-----------------");


emitter.once('once',function(){
    console.log('我只执行一次哈');
});


emitter.emit('once');
emitter.emit('once');

// 移除所有事件



console.log("----------会执行-----------------");

emitter.emit('someEvent',"ly",1995);
emitter.removeAllListeners();

console.log("----------不会执行-----------------");

emitter.emit('someEvent',"ly",1995);


```

>EventEmitter 定义了一个特殊的事件  error ，它包含了“错误”的语义，我们在遇到
异常的时候通常会发射  error  事件。当  error 被发射时， EventEmitter 规定如果没有响
应的监听器，Node.js 会把它当作异常，退出程序并打印调用栈。我们一般要为会发射  error
事件的对象设置监听器，避免遇到错误后整个程序崩溃

``` javascript

var events = require('events');

var emmitter = new events.EventEmitter();

emmitter.once('once',function(){
    console.log('我只执行一次哈');
});
emmitter.on('error', (err) => {  
  console.log(err); //whoops! there was an error  
});  


emmitter.emit('once');
emmitter.emit('error',new Error("什么错误"));

```

# 继承  EventEmitter

>大多数时候我们不会直接使用 EventEmitter ，而是在对象中继承它。包括  fs 、 net 、
http 在内的，只要是支持事件响应的核心模块都是  EventEmitter 的子类

>为什么要这样做呢？原因有两点。首先，具有某个实体功能的对象实现事件符合语义，
事件的监听和发射应该是一个对象的方法。其次 JavaScript 的对象机制是基于原型的，支持
部分多重继承，继承  EventEmitter 不会打乱对象原有的继承关系













    

