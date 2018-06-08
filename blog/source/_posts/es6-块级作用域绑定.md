---
title: es6-块级作用域绑定
date: 2018-01-24 21:32:33
tags: es6
---
![timg.jpg](http://upload-images.jianshu.io/upload_images/10843623-82935528251fe29d.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 前言

> 花点时间重新复习一遍es6的语法

> 我的博客地址 ：http://www.aymfx.cn/


### var，let, const 三者的区别

> var 声明的变量会有变量提升的过程，将被提升到作用域的顶部，或者函数的顶部

> let 声明的变量，只能在声明的块作用域中访问和使用，存在于函数内部以及花括号之间的区域

```
{
    let a = 3;
}

console.log(a); //a is not defined
```


```
function(){
    let a = 3;
}
console.log(a); //a is not defined
```


### const 是用来声明静态变量的，一但设置了值之后就不可改变



```
const a = 20;
a= 60;
//Assignment to constant variable.
```

###  const在对象中是绑定了这个对象，但是对象的内容是可以改变的


```
const a = {length:2}

a.length = 6;
```

### var 可以重复声明变量 let和const声明的变量不能重新声明

```
var count = 30;
let count = 40;
VM49:2 Uncaught SyntaxError: Identifier 'count' has already been declared

```

###  临时死区

let和const不会出现变量提升的情况，未定义的值将直接报错,也就产生所谓的临时死区


```
if(true){
    console.log(typeof value);  //alue is not defined
    let value = "blue"
}
```

>注意这种情况

```
console.log(typeof value);  //alue is not defined
if(true){
    
    let value = "blue"
}
```

### 循环中的块级作用域绑定


```
var fun = [];
for(var i = 0;i<10;i++){
    fun.push(function(){console.log(i)})
}

fun.forEach(function(f){f()})  //0VM118:3 10

```

> 上面代码输出了10个10,不对的，我们期待是0-9，改成这样的话

```
let fun = [];
for(let i = 0;i<10;i++){
    fun.push(function(){console.log(i)})
}

fun.forEach(function(f){f()})  //0VM118:3 10

```

> 以上写法对于 for-in 以及for-of 同样适用

>循环中使用const声明

> 这样会报错


```
var f = [];
for(const i =0;i<10;i++){
    f.push(function(){
        console.log(i);
    })
} //Assignment to constant variable
```

> 但是 for-in 和for-of，由于是绑定元素不会报错，上面在第二次循环修改了变量的值导致报错


```
var f = [];
obj = {
    a:1,
    b:2,
    c:3
}

for(const key in obj){
    f.push(function(){
        console.log(key);
    })
}
f.forEach(function(f){f()}) 
//a
//VM184:10 b
//VM184:10 c
```

```
f= ['1',2,4,5]

for(const key of f){
    console.log(key);
}

//VM204:4 1
//VM204:4 2
//VM204:4 4
//VM204:4 5
```

### 全局作用域的绑定

>var 在全局中相当于添加了window对象的属性，但是有可能误操作覆盖了已有的全局属性


```
console.log(window.RegExp); //ƒ RegExp() { [native code] }
var RegExp = "正则表达式"
console.log(window.RegExp); //正则表达式
```

> 相对于var来说let和const不会创建一个新的绑定,他会屏蔽window的属性，而不是添加或者覆盖window的属性

```
console.log(window.RegExp); //ƒ RegExp() { [native code] }
let RegExp = "正则表达式"
console.log(window.RegExp); //ƒ RegExp() { [native code] }
console.log(RegExp) //正则表达式
```













