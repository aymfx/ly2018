---
title: AngularJS学习1
date: 2016-10-20
tags: Angular
type: tags
---
# AngularJS 简介
		AngularJS 是一个 JavaScript 框架。它可通过 script 标签添加到 HTML 页面。AngularJS 通过 指令 扩展了 HTML，且通过 表达式 绑定数据到 HTML。
## AngularJS 是一个 JavaScript 框架
		AngularJS 是一个 JavaScript 框架。它是一个以 JavaScript 编写的库。AngularJS 是以一个 JavaScript 文件形式发布的，可通过 script 标签添加到网页中
## 什么是 AngularJS？
		AngularJS 使得开发现代的单一页面应用程序（ **SPAs：Single Page Applications** ）变得更加容易。

 - AngularJS 把应用程序数据绑定到 HTML 元素。
 - AngularJS 可以克隆和重复 HTML 元素。
 - AngularJS 可以隐藏和显示 HTML 元素。
 - AngularJS 可以在 HTML 元素"背后"添加代码。
 - AngularJS 支持输入验证。
## AngularJS 指令
	AngularJS 指令是以 ng 作为前缀的 HTML 属性。
## AngularJS 表达式
	AngularJS 表达式写在双大括号内：{{ expression }}。
	AngularJS 表达式把数据绑定到 HTML，这与 ng-bind 指令有异曲同工之妙。
	AngularJS 将在表达式书写的位置"输出"数据。
	AngularJS 表达式 很像 JavaScript 表达式：它们可以包含文字、运算符和变量。
## AngularJS 应用
	AngularJS 模块（Module） 定义了 AngularJS 应用。
	AngularJS 控制器（Controller） 用于控制 AngularJS 应用。
	ng-app指令定义了应用, ng-controller 定义了控制器。
# 开始学习语法
## 表达式
	AngularJS 表达式写在双大括号内：{{ expression }}
	AngularJS 表达式也可以写在ng-bind="expression"里面
	expression 可以是 字符串 数字 对象 数组
### 举个栗子
 - 数字

``` bash
		 <div ng-app="" ng-init="num1=1;num2=5"> //ng-appy:指定angularjs的应用范围，ng-init:初始化变量
				<p>总价： {{ num1*num2 }}</p> 
		</div>
```

 - 字符串

``` bash
		<div ng-app="" ng-init="firstName='l';lastName='y'">
			 <p>姓名： {{ firstName + " " + lastName }}</p>
		</div>
```

 - 对象

``` bash
		<div ng-app="" ng-init="person={firstName:'l',lastName:'y'}">
			<p>姓为 {{ person.lastName }}</p>
		</div>
```

 - 数组

``` bash
		<div ng-app="" ng-init="points=[1,15,19,2,40]">
			<p>第三个值为 {{ points[2] }}</p>
		</div>
```
  - ng-bind

``` bash
		 <div ng-app="" ng-init="points=[1,15,19,2,40]">
			<p>第三个值为 <span ng-bind="points[2]"></span></p>
	     </div>
```
## 指令
 - ng-app 指令初始化一个 AngularJS 应用程序。
 - ng-init 指令初始化应用程序数据。
 - ng-model 指令把元素值（比如输入域的值）绑定到应用程序。***主要用在表单***
 - ng-repeat 指令会重复一个 HTML 元素


### 自定义指令
	使用 .directive 函数来添加自定义的指令，使用驼峰法来命名一个指令，它时需要以 - 分割
#### 举个栗子

``` bash
<!DOCTYPE html>
<html ng-app="directive">
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
	<input type="checkbox" ng-model="toggle"/>
	<div ly-show="toggle">//这是自定义属性，使用时加：restrict:"A"
		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt iste ex labore iure ut blanditiis eos eum voluptates odit nulla nisi delectus aut assumenda qui facere iusto nobis quis possimus.
	</div>
	<input type="text" ng-model="color"/>
	<ly-color r="color" name="我是不一样的烟火" ng-click="test()">
		
	</ly-color>//这是自定义元素，使用时加：restrict:"E"
	
    <script src="js/angular.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
		var app=angular.module("directive",[]); //定义一个全局的应用（必须写）
		
		app.run(function($rootScope){
			 $rootScope.toggle=true;
		})   //可以自定义全局属性
		
		app.directive("lyShow",function(){
			return {
				restrict:'A',  /*限制使用:restrict 值可以是以下几种:
								E 作为元素名使用
								A 作为属性使用
								C 作为类名使用
								M 作为注释使用*/
								restrict 默认值为 EA, 即可以通过元素名和属性名来调用指令。
				link:function(scope,element,attr){//方法，三个参数：作用域,dom，以及，属性
					
					scope.$watch('value',function(newv,oldv){//对某个元素进行监听它的值得变化，参数1新值，参数2旧值
						console.log(newv);
						  if(newv){
						  		element[0].style.display="block";
						  }else{
						  		element[0].style.display="none";
						  }
						
					})
				},
				scope:{
					value:"=lyShow"  //进行元素绑定  = 表示是一个相关的变量，@表示是某个字符，&表示方法
				}
			}
		})
		
		app.directive('lyColor',function(){
			return {
				restroct:"E",
				templateUrl:"directive-mess.html",
				link:function(scope,ele,attr){
					  scope.test=function(){
					  	console.log("ahahahhah");
					  }
				},
				scope:{
					name:"@name",
					color:"=r"
					
				},
				replace:true
			}
		})
    </script>
	</body>
</html>

```


