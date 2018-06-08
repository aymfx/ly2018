---
title: jquery回调函数复习
date: 2016-08-11
tags: jquery
---

# jquery回调函数复习

## callbacks.add(); 可以添加一个或者多个回调


> 创建一个回调函数

``` bash
var callbacks = $.Callbacks();

var foo = function (value) {
	console.log('foo:'+value);
}

var bar = function (value) {
	console.log("bar:"+value);
}


```


> 这是一个函数的情况


``` bash
callbacks.add(foo);

callbacks.fire('hello');//foo:hello
```
 
> 继续添加一个函数


``` bash
callbacks.add(bar);

callbacks.fire('world');// foo:world  bar:world
```

## callbacks.disable()  禁止列表中的回调列表


``` bash
var foo = function (value) {
	console.log('foo:'+value);
}

var bar = function (value) {
	console.log("bar:"+value);
} 

var callbacks = $.Callbacks();

callbacks.add(foo);

callbacks.fire('hello');//foo:hello

callbacks.disable(foo);//后面不执行了

callbacks.fire('hello');

callbacks.add(bar);

callbacks.fire('world');
```

## callbacks.empty() 清空所有队列


``` bash
var callbacks = $.Callbacks();

var foo = function(){
	console.log("测试1");
}
var bar = function(value){
	console.log("测试1 ",value);
}


callbacks.add(foo);
callbacks.add(bar);

console.log(callbacks.has(foo)); //true

callbacks.fire("我出来了");  //测试1  测试1 我出来了

callbacks.empty();

callbacks.fire("我出来了"); //

console.log(callbacks.has(foo)); //false
```

## callbacks.fire(args);  执行加入在队列里面的所有函数


``` bash
var callbacks = $.Callbacks();

var foo = function(value){
	console.log("测试1",value);
}
var bar = function(value){
	console.log("测试2",value);
}

callbacks.add(foo)
callbacks.add(bar)

callbacks.fire("我是","liuyang"); //测试1 我是 测试2 我是

callbacks.fire(["我是","liuyang"]); //测试1 (2) ["我是", "liuyang"]  测试2 (2) ["我是", "liuyang"]
```

## callbacks.fired() 判定回调是否执行过一次

 
``` bash
var callbacks = $.Callbacks();

var foo = function(value){
	console.log("测试1",value);
}
var bar = function(value){
	console.log("测试2",value);
}

callbacks.add(foo)

callbacks.add(foo)

console.log(callbacks.fired()); //false

callbacks.fire("试试");  //测试1 试试

console.log(callbacks.fired());  //true
```

## callbacks.fireWith([context],[args])

> context: 该列表中的回调被触发的上下文引用

> args: 一个参数或参数列表传回给回调列表。



``` bash
var callbacks = $.Callbacks();

var foo = function(value1,value2){
	console.log("测试1",value1,value2);
}

callbacks.add(foo);

callbacks.fireWith(window,["我是","aymfx"]);  //测试1 我是 aymfx

callbacks.fireWith(null,["我是","aymfx"]);  //测试1 我是 aymfx
```

## callbacks.has(callback)  判断队列中是否出存在此回调函数


``` bash
var callbacks = $.Callbacks();

var foo = function(value1,value2){
	console.log("测试1",value1,value2);
}


var f00 = function(value1,value2){
	console.log("测试1",value1,value2);
}

callbacks.add(foo);
console.log(callbacks.has(foo)); //true
console.log(callbacks.has(f00)); //false
```

## callbacks.lock() 锁定当前状态 和 callbacks.locked()  判断状态是否锁定

``` bash
var callbacks = $.Callbacks();

var foo = function(value){
	console.log("测试1",value);
}


callbacks.add(foo)

callbacks.fire("bar"); //测试1 bar

console.log(callbacks.locked()); //false

callbacks.lock();

callbacks.fire("bar1"); //

console.log(callbacks.locked()); //true
```

## callbacks.remove(callbacks);  移除一个或者多个回调函数


``` bash
var callbacks = $.Callbacks();

var foo = function(value){
	console.log("测试1",value);
}
var bar = function(value){
	console.log("测试2",value);
}

callbacks.add(foo)

callbacks.add(bar)

callbacks.fire("哈哈"); //测试1 哈哈 测试2 哈哈

callbacks.remove(bar);

callbacks.fire("呵呵"); //测试1 呵呵

callbacks.remove();

callbacks.fire("呵呵"); //测试1 呵呵

console.log(callbacks.has(bar)); //false
```













