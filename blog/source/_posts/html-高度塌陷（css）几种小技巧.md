---
title: html--高度塌陷（css）几种小技巧
date: 2016-07-08
tags: html
---

# 高度塌陷的情况：
> 当父元素没有设置高度，并且子元素块都向左浮动起来了，那么父元素就会塌陷
         
# 解决办法
## 1.在高度塌陷的父div里面加一个div：

``` bash
<div id="a">
     	  <div id="a1"></div>
     	  <div id="a2"></div>
     	  <div style="clear: both;"></div>//加一个标签，清除浮动
     </div>
```
> 优点：适合初学者，兼容性 强。
> 缺点：代码不简练，不利于优化。
## 2.overflow + zoom方法
   

``` bash
 #a{
		   	    background: red;
		   	    /*第二种方法*/
		   	    overflow: hidden;
		   	    zoom:1;
		   }
```
> 优点：兼容性强。
> 缺点：对margin属性会有影响，不能设负值，会被裁掉。负值绝对定位也不可以。
## 3.after + zoom方法（绝杀)

``` bash
 #a{
		   	    background: red;
		   	    zoom:1;
		   }
		   #a:after{
		   	      display: block;
		   	      content: '.';
		   	      clear: both;
		   	      line-height: 0;
		   	      visibility: hidden;
		   }
```
> 优点：通用，兼容性强
> 缺点：不好记。



## 整个代码片段：
 
``` bash

<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
	<title>高度塌陷问题</title>

	<style type="text/css">
		   #a{
		   	    background: red;
		   	    zoom:1;
		   }
		   #a:after{
		   	      display: block;
		   	      content: '.';
		   	      clear: both;
		   	      line-height: 0;
		   	      visibility: hidden;
		   }
		   #a1,#a2{
		   	   width: 50px;
		   	   height: 50px;
		   	   margin: 10px;
		   	   background: blue;
		   	   float: left;
		   }
	</style>
</head>
<body>
     <div id="a">
     	  <div id="a1">是是是</div>
     	  <div id="a2"></div>
     	  <!-- <div style="clear: both;"></div> -->
     </div>

</body>
</html>
```


