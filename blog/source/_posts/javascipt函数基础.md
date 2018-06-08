---
title: javascipt函数基础
date: 2016-07-25
tags: javascript
---

# JavaScript函数基础
## 定义方法
 - 静态方法
	 - function 函数名([参数列表]){函数体；[return [返回值；]]}
 - 动态匿名方法
	 - var 函数名=new Function(["虚参列表"]，"函数体");
	
	    	var add = new Function(x,y, var sum; sum=x+y;return sum;);
	    	var s = add(100,39);
	    	alert(s=+s);
 - 直接量方法 函数名=function([参数列表]){函数体；[return [返回值；]]}

## 调用方法
 - 直接调用： 函数名(实参列表)
 - 在连接中调用：<a href="javascript:函数名()">描述文字</a>
 - 在事件中调用：事件类型="函数名()"
 - 递归调用
 - 自执行 (function(){})()

## 方法
 - apply:将函数作为对象的方法来调用将指定参数传递给该方法
 
 - call:将函数作为对象的方法来调用将指定参数传递给该方法

		<script type="text/javascript">
		function A(){
		this.flag = 'A';
		this.tip = function(){
		alert(this.flag);
		};
		}
		function B(){
		this.flag = 'B';
		}
		var a = new A();
		var b = new B();
		//a.tip.call(b);
		a.tip.apply(b);
		</script>
 - toString：返回函数的字符串表示
		
    		function a(){
    		alert(a)
    		}
    		
    		document.write(a.toString());//function a(){ alert(a) }


## arguments对象
 - 功能:存放实参的参数列表
 - 特性
	 - 在函数体内使用
	 - 带有下标属性，但并非数组
	 - 函数声明时自动初始化
 - 属性
	 - length:获取函数实参的长度
      
	 - callee:返回当前正在指向的函数
	 
	 		function a(){
				document.write(arguments.callee);

			}

			a();//function a(){ document.write(arguments.callee); }

	 - caler返回调用当前正在执行函数的函数名

## 函数参数
 - 参数类型
	 - 形参
		 - 定义函数时使用的参数
		 - 接收调用该函数时传递的参数
	 - 实参
		 - 调用函数时传递给函数的实际参数
 - 特性
	 - 参数个数没有限制
		 - 实参<形参 ：多余形参=undefined;
		 - 实参>形参 ：多余的被忽略
	 - 参数的类型没有限制
	 - 通过arguments对象访问参数数组
	 - 参数始终按值传递
		 - 基本类型：传值
		 - 引用类型:地址
	
## 指针标识
 - this:指向当前操作的对象
 - callee:指向参数集合所属函数
 - prototype:指向函数附带的函数原型对象
 - constructor:指向创建该对象的构造函数


 


