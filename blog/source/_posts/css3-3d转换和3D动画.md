---
title: css3-3d转换和3D动画
date: 2016-07-18
tags: html
---

# 3D转换

## 3D翻转方法
	rotateX();沿x轴翻转
	rotateY();沿Y轴翻转
	rotateZ();沿Z轴翻转(类似于rotate()在水平旋转)

## 3D位置移动 的3种写法
	transform: translate3d(30px,30px,800px)
	transform:translateZ(800px) translateX(30px) translateY(30px);
	transform:translateZ(800px) translate(30px,30px);

## 3D视距
	perspective:value;
	用于看3D效果

## 3D视角
	transform-style:preserve-3d;
	用于子元素保持3d效果
	transform-origin:left/right top/bottom
	用于确定翻转位置,默认为center

# 3D动画
	
	1.创建动画的运动规则，并且取名
		@keyframes name{
			from{}
			to{}
			to{}
		}

	2.绑定动画在某个元素上
	动画属性
	animation:(简写)name  5s  linear  2s  infinite alternate;

	animation-name:		动画名

	animation-duration:		时间 默认0

	animation-timing-function:曲线 默认ease
			linear： 线性过渡。等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0) 
			ease： 平滑过渡。等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0) 
			ease-in： 由慢到快。等同于贝塞尔曲线(0.42, 0, 1.0, 1.0) 
			ease-out： 由快到慢。等同于贝塞尔曲线(0, 0, 0.58, 1.0) 
			ease-in-out： 由慢到快再到慢。等同于贝塞尔曲线(0.42, 0, 0.58, 1.0) 
			cubic-bezier(<number>, <number>, <number>, <number>)： 特定的贝塞尔曲线类型，4个数值需在[0, 1]区间内 

	animation-delay	:延时 默认0

	animation-iteration-count:播放次数 默认1
			infinite： 无限循环 
			<number>： 指定对象动画的具体循环次数 

	animation-direction:周期后是否倒放
			running： 运动 
			paused： 暂停 

	animation-play-state:是否暂停 默认 running
			running： 运动 
			paused： 暂停 

	animation-fill-mode:动画结束后的状态
			none： 默认值。不设置对象动画之外的状态 
			forwards： 设置对象状态为动画结束时的状态 
			backwards： 设置对象状态为动画开始时的状态 
			both： 设置对象状态为动画结束或开始的状态 


# 例子:
<!-- 正方体 -->
 
``` bash
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>正方体</title>
</head>
<style type="text/css">
	*{margin:0;padding:0;}
	li{list-style: none;}
	.wrap{transform-style:preserve-3d;transition:2s all; margin: 80px auto;width:100px;}
	.wrap ul{transform:rotateX(45deg) rotateY(45deg);position: relative;transform-style:preserve-3d; width: 100px;height: 100px;}
	.wrap ul li{width: 100px;height: 100px;opacity:0.2;left: 0;top:0;position: absolute;}
	.wrap ul .down{background:#f00;transform: translateZ(-50px);}
	.wrap ul .up{background:#f00;transform: translateZ(50px);}

	.wrap ul .left{background:#ff0;transform: translateX(-50px) rotateY(90deg) ;}
	.wrap ul .right{background:#f0f;transform: translateX(50px) rotateY(90deg) ;}

	.wrap ul .top{background:#f0f;transform: translateX(-50px) rotateX(90deg) ;}
	.wrap ul .top{background:#ff9;transform: translateX(50px) rotateX(90deg) ;}

	.wrap:hover{transform:rotateY(360deg);}

</style>
<body>
	<div class="wrap">
		  <ul>  <li class="left"></li>
		  		<li class="right"></li>
		  		<li class="top"></li>
		  		<li class="bottom"></li>
		  		
		  		<li class="up"></li>
		  		<li class="down"></li>
		  </ul>
	</div>
</body>
</html>
```

<!-- 导航 -->

``` bash
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>3d导航</title>
	<style type="text/css">
	    *{padding:0;margin: 0;}
	    li{list-style: none;}
		ul{width: 1000px;margin:50px auto;}
		ul li{float: left;transform-style: preserve-3d;}
		ul li a{display: block;width:199px;height:50px;border-right: 1px solid #666;position: relative; text-align: center;transform-style: preserve-3d;transition:1s all;}
		ul li:last-child a{border: 0;}
		ul li a p{width:199px;height:50px;position: absolute;left: 0;top: 0; font:700 12px/50px "";}
		ul li a .a1{background: #f99;}
		ul li a .a2{ 
			background-color: #51938f;
			  -webkit-background-size: 5px 5px;
			  background-size: 5px 5px;
			  background-position: 0 0, 30px 30px;  
			  background-image:linear-gradient(45deg, #478480 25%, transparent 25%, transparent 75%, #478480 75%, #478480),linear-gradient(45deg, #478480 25%, transparent 25%, transparent 75%, #478480 75%, #478480);

			transform-origin: bottom;transform: rotateX(-90deg) translateY(50px);
			}
		ul li a:hover{transform-origin: top;transform: rotateX(90deg);}


	</style>
</head>
<body>
	<ul>
		<li>
		<a href="">
			<p class="a1">首页</p>
			<p class="a2">首页</p>
		</a>
		</li>
		<li>
		<a href="">
			<p class="a1">首页</p>
			<p class="a2">首页</p>
		</a>
		</li>
		<li>
		<a href="">
			<p class="a1">首页</p>
			<p class="a2">首页</p>
		</a>
		</li>
		<li>
		<a href="">
			<p class="a1">首页</p>
			<p class="a2">首页</p>
		</a>
		</li>
		<li>
		<a href="">
			<p class="a1">首页</p>
			<p class="a2">首页</p>
		</a>
		</li>

	</ul>
</body>
</html>
```




