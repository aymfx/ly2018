---
title: 用CSS做一个三角形
date: 2016-07-11
tags: html
---
# 利用border的特性来做一个三角形

``` bash
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>三角形</title>
	<style type="text/css">
		   .zsanjiao{
		   	/*去掉内容*/
		   	width:0;
		   	height:0;
		   	/*解决兼容性*/
		   	overflow: hidden;
		   	/*设置三角形的大小和方向,transparent是显示透明*/
		   	border-left: 50px solid transparent;
		   	border-right: 50px solid transparent;
		   	border-bottom:50px solid red;
		   	/*border-style:dashed dashed solid dashed;*/
		   }
		   /*它的原理*/
		   .moxing{width:0;height:0; 
		   	border-left: 50px solid green;
		   	border-right: 50px solid pink;
		   	border-bottom:50px solid red;
			border-top:50px solid red;
		   }
	</style>
</head>
<body>
	<div class="zsanjiao"></div>
	<hr/>
	<div class="moxing"></div>
</body>
</html>
```


