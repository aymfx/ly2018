---
title: require.js使用
date: 2016-09-15
tags: require.js
---

# 问题：如何解决前端js出现的文件依赖和命名空间问题
		可以通过命名空间和采用模块化的方式解决，今天学的require.js可以同时解决这两个问题.
# requirejs能带来什么好处
	1.异步加载，防止js加载阻塞页面渲染
	2.不必引用很多js文件
	3.以上两个问题可以解决
# 掌握模块化的思想
	模块化思想就是指将页面根据内容的关联性分解成不同的且相互独立的模块进行开发，每个模块之间没有必然的联系，互不影响。
	模块化思想的主要优势就体现在：提高重用性，提高开发效率，降低维护成本，提升代码质量等方面。
# 	AMD(require.js)和CMD(sea.js)规范
	AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
	CMD规范，全称”Common Module Definition”，称为 通用模块加载规范 。一般也是用在浏览器端。浏览器端异步加载库Sea.js实现的就是CMD规范。在CMD规范中，一个模块就是一个文件。


# 引用require.js

``` bash
<script data-main="main.js" src="js/require.js"></script>

 data-main:指定网页程序的主模块,意思是整个网页的入口代码,所有代码都从这儿开始运行.以后不用再引入js代码了，由于require.js默认的文件后缀名是js，所以可以把main.js简写成main。当我们在里面写了路径之后，以后引入js目录下面的直接写文件名不加后缀，否则不仅要加后缀还要加文件路径
 require.js：引入模块
 下载地址：http://requirejs.org/docs/release/2.3.3/minified/require.js

# 主程序入口（主模块main.js）
## 测试是否引入成功
![一如](http://img.blog.csdn.net/20170306193718505?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcXFfMjkxMDQ5OTk=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
	
## 调用模块写法（放在mian.js中）

``` bash
require([],function(){
	alert(1);
})


require 调用模块，接收二个参数。
第1个参数是一个数组，表示所依赖的模块 (也就是js了) ；
第2个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。

## 依赖模块写法（独立单独的js--module.js）


define([],function(){
		alert(1);
})

## 在入口函数添加依赖(main.js)


main.js
	require(["js/module1.js","js/module2.js"],function(m1){
		   alert("我是入口函数");
	})
```

``` bash
module1.js
	define([],function(){
	alert("我是模块一");
	})
```

``` bash
module.js
	define([],function(){
		 alert("我是模块2");
	})
```
	结果：我是模块一  我是模块2   我是入口函数
	小结：由于依赖模块是异步的，所以必须先执行完，才能调用回调函数,两个依赖的顺序出现不一定按顺序来

## 加载文件（加载服务器文件）
//引入jquery

``` bash
require.config({
	  paths:{
	  	"jquery":["http://libs.baidu.com/jquery/2.0.3/jquery"]//可引入多个
	  }
})


require(["js/module1.js","js/module2.js"],function(m1){
	   alert("我是入口函数");
})

require(["jquery"],function($){
		console.log(typeof $);//function
})
```
### 其实当我们在data-main=“js/main"这样设定其实相当于：

``` bash
	require.config({
    baseUrl : "js"
})
```
### 引入第三方模块

	暂时没学，回头补充

	补充：主模块的依赖模块是['jquery', 'module1', 'module2']。默认情况下，require.js假定这三个模块与main.js在同一个目录，文件名分别为 jquery.js，module1.js和module2.js，然后自动加载。

