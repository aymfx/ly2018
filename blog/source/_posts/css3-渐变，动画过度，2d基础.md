---
title: css3-渐变，动画过度，2d基础
date: 2016-07-14
tags: html
---

# 1.CSS3 渐变的语法及应用

	## 线性渐变，从左到右，或者从上倒下，线性变化

   linear-gradient:值1,值2 [值3],值4

	     值1:
	     		top,to bottom,180deg 表示从上到下

	     		bottom,to top,0deg 表示从下到上

	     		left,to right,90deg 表示从左到右

	     		right,to left,270deg 表示从右到左

	     		45deg,to top right 从左上到右上

	     		135deg,to top right 从左上到右上

	     		等等
		值2：  起始颜色
		值3：  可以设置设置颜色的过度的距离，如50%，就是0到50%
		值4：  终止颜色
		注：起始位置和终止位置可设置多个颜色；

	## 径向渐变，从内而外扩散（圆）

	radial-gradient:值1,值2 [值3],值4

	    值1:
	     		ellipse:椭圆效果，当元素宽高一致时为正圆
	     		circle:正圆

		值2：  起始颜色
		值3：  可以设置设置颜色的过度的距离，如50%，就是0到50%
		值4：  终止颜色
		注：起始位置和终止位置可设置多个颜色；

	## 重复渐变，按照规律一层一层循环

	repeating-radial-gradient值1,值2 [值3],值4

	    值1:
	     		ellipse:椭圆效果，当元素宽高一致时为正圆
	     		circle:正圆

		值2：  起始颜色
		值3：  可以设置设置颜色的过度的距离，如50%，就是0到50%
		值4：  终止颜色
		注：起始位置和终止位置可设置多个颜色；

	repeating-linear-gradient值1,值2 [值3],值4

	    值1:
	     		ellipse:椭圆效果，当元素宽高一致时为正圆
	     		circle:正圆

		值2：  起始颜色
		值3：  可以设置设置颜色的过度的距离，如50%，就是0到50%
		值4：  终止颜色
		注：起始位置和终止位置可设置多个颜色；

# 2.CSS3 过渡的用法

	transition:值1,值2,值3,值4
		值1:
				transition-property:all 或者其他属性值

		值2：   transition-duration:设置时间 如：2s
		值3：   transition-timing-function:设置速度
										linear 匀速	
										ease 慢快慢
										ease-in 慢开始	
										ease-out 慢结束
										ease-in-out  慢开始慢结束
										cubic-bezier 自定义贝兹尔曲线

		值4：  transition-delay:设置延时 如2s


# 3.CSS3 2D 转换的应用

     transform属性的属性值的运用

    	translate(x,y):设置位移量
    		x:横向位移
			y:纵向位移

		scale(倍数):设置放大和缩小

		rotate(角度):设置顺时针旋转的角度

		skew(x角度,y角度):设置倾斜角度
			当角度为90deg时，消失

		matrix()合体写法
		matrix() 方法把所有 2D 转换方法组合在一起。
		matrix() 方法需要六个参数，包含数学函数，允许您：旋转、缩放、移动以及倾斜元素。
		缩放X, tan(X度), tan(Y度),缩放Y,位置X,位置Y

# 实例

## 渐变

``` bash
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>css3元素学习</title>
	<style type="text/css">
		/*线性渐变*/
        div{width: 200px;height: 100px;margin-bottom: 50px;}

        div:nth-child(1){background: linear-gradient(to right,red,blue);}
        div:nth-child(2){background: radial-gradient(circle,red,blue);}
        div:nth-child(3){background: radial-gradient(ellipse,red,blue);}
        div:nth-child(4){background: repeating-radial-gradient(circle,red,blue);height: 200px;}
        div:nth-child(5){background: repeating-linear-gradient(to right,red,blue);}
        div:nth-child(6){background: repeating-radial-gradient(circle,red 20%,blue 40%,green 40%);}

	
	</style>
</head>
<body>
	<div>线性渐变</div>
	<div>镜像渐变--circle</div>
	<div>镜像渐变--ellipse</div>
	<div>重复渐变--repeating-radial-gradient</div>
	<div>重复渐变--repeating-linear-gradient</div>
	<div>重复渐变,多个颜色以及设置范围--repeating-radial-gradient</div>
</body>
</html>
```

## 动画过度

``` bash
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>动画过度</title>
</head>
<body>
	<style type="text/css">
		    div{width: 600px;height: 600px;background: #99f;position: relative;}
		    div p{
		    	width: 20px;height: 20px;border-radius: 10px;background: #f99;position: absolute;left: 0;top:0;
		    	/*transition:2s ease all 2s;*/ opacity: 1;
		    	transition-property:all;
		    	transition-duration:2s;
		    	transition-delay:2s;
		    	transition-timing-function:ease-in-out;


		    }
		    div:hover p{left: 200px;top:500px;opacity: 0.2;}
	</style>
</body>
<div>
	<p></p>
</div>
</html>
```

## 2d元素转换
  

``` bash
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>动画过度</title>
</head>
<body>
	<style type="text/css">
		    div{width: 600px;height: 600px;background: #99f;position: relative;}
		    div p{
		    	width: 100px;height: 100px;background: #00f;
                /*transform: translate(100px,200px) scale(2) rotate(60deg) skew(20deg) ;*/
                transform:matrix(1,2,2,1,100,200);

		    }
		  
	</style>
</body>
<div>
	<p></p>
</div>
</html>
```










