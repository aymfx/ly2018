---
title: es6学习-let和const命令
date: 2016-10-28
tags: es6
---

# 前言：
	做的学习笔记，参考的是http://es6.ruanyifeng.com/#docs/intro，里面的博客
# let和const命令
	let:它所声明的变量，只在本代码块内有效
	
	

``` bash
for (let i = 0; i < 10; i++) {}
	console.log(i);
	//ReferenceError: i is not define
```
	for循环还有一个特别之处，就是循环语句部分是一个父作用域，而循环体内部是一个单独的子作用域
	
	

``` bash
for (let i = 0; i < 3; i++) {
	  let i = 'abc';
	  console.log(i);
	}
	// abc
	// abc
	// abc
```
	 不存在变量提升 let 它所声明的变量一定要在声明后使用，否则报错。
	 

``` bash
// var 的情况
	console.log(foo); // 输出undefined
	var foo = 2;
	
	// let 的情况
	console.log(bar); // 报错ReferenceError
	let bar = 2;
```
	暂时性死区（temporal dead zone，简称 TDZ）：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响，对于typeof来说不再是安全的操作了

``` bash
var tmp = 123;
	if (true) {
	  tmp = 'abc'; // ReferenceError
	  let tmp;
	}
	
typeof x; // ReferenceError
let x;
```
	不允许重复声明 
	

``` bash
// 报错
	function () {
	  let a = 10;
	  var a = 1;
	}
	
	// 报错
	function () {
	  let a = 10;
	  let a = 1;
	}
```

# const 命令
	const声明一个只读的常量。一旦声明，常量的值就不能改变。
``` bash
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.
```

	const的作用域与let命令相同：只在声明所在的块级作用域内有效。
``` bash
if (true) {
  const MAX = 5;
}

MAX // Uncaught ReferenceError: MAX is not defined
```
	const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
``` bash
if (true) {
  console.log(MAX); // ReferenceError
  const MAX = 5;
}
```
	本质：实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
``` bash
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only
```

``` bash
const a = [];
a.push('Hello'); // 可执行
a.length = 0;    // 可执行
a = ['Dave'];    // 报错
```
	如果真的想将对象冻结，应该使用Object.freeze方法。
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

# ES6 声明变量的六种方法
	ES5 只有两种声明变量的方法：var命令和function命令。ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。所以，ES6 一共有6种声明变量的方法。

# 顶层对象请参考博客吧
