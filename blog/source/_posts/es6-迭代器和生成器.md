---
title: es6-迭代器和生成器
date: 2018-03-20
tags: es6
---
![timg.jpg](http://upload-images.jianshu.io/upload_images/10843623-4adb688267c9f4d3.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

# 前言 

> 从家里回来了，翻了翻书，发现es6的知识点，忘了不少，还好记了点笔记，今年需要更加努力，看着以前的同学都开始娶妻生子，买车买房，我也要努力为自己的未来考虑

> 我的博客地址 ：[http://www.aymfx.cn/](https://link.jianshu.com/?t=http%3A%2F%2Fwww.aymfx.cn%2F)


### 迭代器

> 一个迭代器对象 ，知道如何每次访问集合中的一项， 并跟踪该序列中的当前位置。在  JavaScript 中 迭代器是一个对象，它提供了一个next() 方法，用来返回序列中的下一项。这个方法返回包含两个属性：done和 value。

```
//这是模仿es6迭代器的方式
    function createIterator (items){
        var i =0;
        return {
            next:function(){
                var done = (i>=items.length);
                var value = !done ? items[i++]:undefined;
                
                return {
                    done:done,
                    value:value
                }
            }
        }
    }
    var iterator= createIterator([1,2,3]);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    
//{done: false, value: 1}
//VM42:18 {done: false, value: 2}
//VM42:19 {done: false, value: 3}
//VM42:20 {done: true, value: undefined}
//VM42:21 {done: true, value: undefined}

```
> 这是个简单的es5的迭代器，在es6的迭代器更加复杂

### 什么是生成器

> 虽然自定义的迭代器是一个有用的工具，但由于需要显式地维护其内部状态，因此需要谨慎地创建。Generators提供了一个强大的选择：它允许你定义一个包含自有迭代算法的函数， 同时它可以自动维护自己的状态。它是这样表示的

```
//生成器

function *createIterator(){
    yield 1;
    yield 2;
    yield 3;
    
}
//生成器的调用方式与普通函数相同，只不过返回的是一个迭代器
 var iterator= createIterator();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

//{value: 1, done: false}
//VM55:12 {value: 2, done: false}
//VM55:13 {value: 3, done: false}

```
> 每个yield相当于一个调用一次next方法，而且每次执行yield都会暂停一次。函数名前面的*代表它是一个生成器

> yield只能在生成器中用，不能在普通函数使用,生成器的内部函数也不能使用（语法错误），另外yield关键字可以返回任何值或者表达式

```
function * createIterator(itmes){
    for(let i = 0; i< items.length;i++){
        yield items[i]
    }
}

var iterator= createIterator([1,2,3]);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

//{value: 1, done: false}
//VM98:8 {value: 2, done: false}
//VM98:9 {value: 3, done: false}
//VM98:10 {value: undefined, done: true}
//VM98:11 {value: undefined, done: true}
```

#### 生成函数表达式

```
let createIterator = function *(items) {
    for (let i = 0; i< items.length ; i++){
        yield items[i];
    }
    
}

var iterator= createIterator([1,2,3]);
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

//VM108:10 {value: 1, done: false}
//VM108:11 {value: 2, done: false}
//VM108:12 {value: 3, done: false}
//VM108:13 {value: undefined, done: true}
//VM108:14 {value: undefined, done: true}

``` 

> 不能用箭头函数来创建生成器

#### 生成器对象的方式

```
let o = {
    createIterator:function *(items) {
        for (let i = 0; i< items.length ; i++){
        yield items[i];
    }
    }
}

let o.createIterator([1,2,3])

```
> 也可以用es6的写法

```
let o = {
    *createIterator(items) {
        for (let i = 0; i< items.length ; i++){
        yield items[i];
    }
    }
}

let o.createIterator([1,2,3])


```

#### 可迭代对象和for-of循环
> es6中所有的集合对象（数组，Set集合以及Map集合）和字符串都是可迭代对象，可迭代对象都是具有Symbol.iterator属性，通过指定的函数可以返回一个作用于附属对象的迭代器

> 由生成器创建的迭代器都是可迭代对象，因为它会默认为Symbol.iterator属性赋值。

> for -of 每次执行都会调用next()方法，并将返回的结果对象的value存储在变量中，直到遇到对象的done属性为true

```
 let values = [1,2,3];

for(let value of values){
      console.log(value);
}

//返回结果
// 1
// 2
// 3
```

#### 访问可迭代对象的默认的迭代器
```
let values = [1,2,3];
let iterator = values[Symbol.iterator]();

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

//运行结果

//{value: 1, done: false}
//VM57:5 {value: 2, done: false}
//VM57:6 {value: 3, done: false}
//VM57:7 {value: undefined, done: true}
```
### 创建可以迭代的对象
> 默认情况下开发者定义的对象是不能迭代的，但是我们可以给Symbol.iterator属性加一个生成器
```
let arr = {
      items:[],
      *[Symbol.iterator](){
          for(let item of this.items){
        yield item;
                                                        }
                                            }
}
let a = [1,2,3];
a.forEach(value => arr.items.push(value));

for(let x of arr){
      console.log(x);
 }
// 1
//2
//3
```
### 内建迭代器
> es6自己定义了一些迭代器，我们只有在无法用这些内建迭代器实现功能时才可能自己创建

#### 集合对象迭代器
> es6的三种对象数组，Set集合，Map集合都内置了下列三种迭代器
 - entries() 返回一个迭代器，其值为多个键值对
 - values() 返回一个迭代器，其值为集合的值
- keys() 返回一个迭代器，其值为集合中的所有键名

> entries()栗子 三种表现

```
let colors = ['red','blue','green'];
let tracking = new Set([123,567,9012]);
let data = new Map();
data.set('title','es6教程');
data.set('format','ebook');
for (let entry of colors.entries()){
      console.log(entry);
}
for (let entry of tracking .entries()){
      console.log(entry);
}
for (let entry of data.entries()){
      console.log(entry);
}
```
![运行结果](http://upload-images.jianshu.io/upload_images/10843623-ac216eee2bd7b0b6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> values()迭代器
```
let colors = ['red','blue','green'];
let tracking = new Set([123,567,9012]);
let data = new Map();
data.set('title','es6教程');
data.set('format','ebook');
for (let entry of colors.values()){
      console.log(entry);
}
for (let entry of tracking .values()){
      console.log(entry);
}
for (let entry of data.values()){
      console.log(entry);
}
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-3c3a015d2b46b429.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 数组的values()谷歌暂不支持，所以我们需要小心使用这些方法，有的浏览器还是支持的，谷歌不支持我肯定不会用

> keys()迭代器

```
let colors = ['red','blue','green'];
let tracking = new Set([123,567,9012]);
let data = new Map();
data.set('title','es6教程');
data.set('format','ebook');
for (let entry of colors.keys()){
      console.log(entry);
}
for (let entry of tracking .keys()){
      console.log(entry);
}
for (let entry of data.keys()){
      console.log(entry);
}
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-ff3457147502690e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 不同的集合类型在使用for-of迭代有各自默认的迭代器

```
let colors = ['red','blue','green'];
let tracking = new Set([123,567,9012]);
let data = new Map();
data.set('title','es6教程');
data.set('format','ebook');

//与colors.values()方法相同
for(let value of colors){
  console.log(value);
}

//与tracking .values()方法相同
for(let value of tracking ){
  console.log(value);
}

//与data.entries()方法相同
for(let value of data){
  console.log(value);
}

```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-5db145e4054950f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> WeakMap和WekSet因为需要管理弱引用，因此无法切确知道集合中存在的值，所以不能被迭代

#### 解构的方式来用for-of

```
let data = new Map();
data.set('title','es6教程');
data.set('format','ebook');

for(let [key,value] of  data){
  console.log(key+":"+value);
}

//title:es6教程
//format:ebook
```
### 字符串迭代器
> es5发布以后，字符串的慢慢变的像数组，于是我们有些方式可以用了，例如我们可以通过[]来获取字符串的中的字符。但是我们怎么访问双字节，就如下面这种情况
```
var message = 'A 𠮷 B';
for(let i = 0;i<message.length;i++){
  console.log(message[i]);
}
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-057bb5d93c53e471.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> 我们可以用 for-of来做迭代

```
var message = 'A𠮷B';
for(let i of message){
  console.log(i);
}
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-227069880ae816f2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### NodeList迭代器
> 虽然在es6之前Nodelist和数组在内部差异表现不一致，容易造成困扰，但是es6之后，nodelist也有了自己的默认的迭代器，并且实现方式一致，因此我们可以这样写了
```
var divs = document.getElementsByTagName('div');

for(let nodeEle of divs){
  console.log(nodeEle);
}

```
### 展开运算符与非数组可迭代对象

```
//Set
let set = new Set([1,3,3,5,6]),arr = [...set];
console.log(arr); // [1, 3, 5, 6]

//Map
let map= new Map([['name','ly'],['sex','男']]),arr = [...map];
console.log(arr); 
 //0:(2) ["name", "ly"]
//1:(2) ["sex", "男"]

//数组字面量
let small = [1,2.3,4],mid = [2,3,4,6],all = [0,...small,...mid];
console.log(all); //[0, 1, 2.3, 4, 2, 3, 4, 6]
```

### 高级迭代器功能
> 给迭代器传参数
```
function *createIterator(){
    let first = yield 1;
    let second = yield first+2;
    let third= yield second +3;
}
let iterator = createIterator();
console.log(iterator.next(1));
console.log(iterator.next(2));
console.log(iterator.next(3));
console.log(iterator.next(1));
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-2346da44ba0629fc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
> 第一个next和最后一个next,传的值都会被丢弃，因为之前和之后都不存在可以用的值，所以传参毫无意义，每次传的参数都是作为上一个定义参数的值.

###  在迭代器中抛出错误
> 有时候我们需要增强生成器内部的编程弹性，需要将一些错误抛出去，让迭代器继续运行。
```
function *createIterator(){
    let first = yield 1;
    let second = yield first+2;
    let third= yield second +3;
}
let iterator = createIterator();
console.log(iterator.next(1));
console.log(iterator.next(4));
console.log(iterator.throw(new Error("boom")));
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-37f34e63ac70e131.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 我们如何处理这些错误呢，可以这么写

```
function *createIterator(){
    let first = yield 1;
    let second;
    try{
      second = yield first+2;
}catch(x){
    second = 3
}
   yield second +3;
}
let iterator = createIterator();
console.log(iterator.next(1));
console.log(iterator.next(4));
console.log(iterator.throw(new Error("boom")));
console.log(iterator.next());

```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-45c1a600797830a0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

####  通过return 可以提前结束函数的执行，再一次调用，属性done将会被置为true
```
 function *createIterator(){
        yield 1;
        return;
        yield 2;
        yield 3;
}
let iterator = createIterator();
console.log(iterator .next());
console.log(iterator .next());
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-0b7221c96e78f887.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> return 返回的值也可以作为一次执行的结果
```
 function *createIterator(){
        yield 1;
        return 20;
        yield 2;
        yield 3;
}
let iterator = createIterator();
console.log(iterator .next());
console.log(iterator .next());
console.log(iterator .next());
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-af97635a515ca02a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 委托生成器
> 如果我们需要将两个迭代器分别执行，但是又想只调用一个同样的生成器，我们可以用委托生成器

``` 
function *createIteratorOne(){
        yield 1;
        yield 2;
}
function *createIteratorTwo(){
        yield 'blue';
        yield ';white';
}

 function *createIterator(){
        yield *createIteratorOne();
          yield *createIteratorTwo();
}
let iterator = createIterator();
console.log(iterator .next());
console.log(iterator .next());
console.log(iterator .next());
```
> yield * 也可以用于字符串 例如 yield * 'hello',这时会调用字符串的默认迭代器

```
 function *createIterator(){
       yield * 'hello'
}
let iterator = createIterator();
console.log(iterator .next());
console.log(iterator .next());
console.log(iterator .next());
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-e847af8781dfa3e6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 异步任务执行
> 生成器支持在代码中暂停代码的执行，因此我们可以挖掘一些用法

#### 简单任务生成器
```
function run(taskDef){
    //创建一个无使用限制的迭代器
    let task = taskDef();
    //开始执行任务
    let result = task.next();
    //循环调用next()的函数
    function step(){
        if(!result.done){
                result = task.next();
                 step();
        }
}
//开始执行迭代
  step();
}

//调用run()函数
run(function *(){
      console.log(1);
        yield;
      console.log(2);
        yield;
      console.log(3);
})

//逐步输出 1 2 3
```

####向任务执行器传递数据
```
function run(taskDef){
    //创建一个无使用限制的迭代器
    let task = taskDef();
    //开始执行任务
    let result = task.next();
    //循环调用next()的函数
    function step(){
        if(!result.done){
                result = task.next(result.value);
                 step();
        }
}
//开始执行迭代
  step();
}

//调用run()函数
run(function *(){
    let value =  yield 1;
    console.log(value );
    value =  yield value + 1;
    console.log(value );
})

//逐步输出 1 2 
```

#### 异步任务执行器
```
function run(taskDef){
    //创建一个无使用限制的迭代器
    let task = taskDef();
    //开始执行任务
    let result = task.next();
    //循环调用next()的函数
    function step(){
        if(!result.done){
                if(typeof result.value ==='function'){
                         result.value(function(err,data){
                          if(err){result = task.throw(err)};
                          return;
})
                } else {
               result = task.next();
                 step();
}
               
        }
}
//开始执行迭代
  step();
}

//读取文件函数
let fs = require("fs");

function readFile(filename){
        return function(callback){
                fs.readFile(filename.,callback)
}
}

//调用
run(function *(){
        let contents = yield readFile("config.json");
         doSomethingWith(contents);
          console.log("Done")
})

```









































