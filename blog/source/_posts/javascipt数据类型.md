---
title: javascipt数据类型
date: 2016-07-21
tags: javascript
---

# javaScript数据类型
## undefined
 - 使用var声明变量但未初始化,或者直接未声明
>     var a;
>     alert(a);//undefined
>     alert(b);//控制台输出b is not defined(这是会报错）
 - 区分空对象指针与尚未定义的变量
 
    		var a=null;
    		alert(a);//null
    		alert(typeof a);//object
    		
    		var b;
    		alert(a);//undefined

 - 对未初始化的变量以及未声明的变量使用typeof运算符均会返回undefined


     var a;
    
     alert(typeof a);//undefined
    
     alert(typeof b);//undefined

## null
 - 逻辑上null表示一个空对象的指针
 
    var a=null;

    alert(a);//null

 - 使用typeof检测会返回object

	 alert(typeof a);//object

## undefined与null的关系
 - undefinded派生于null因此在使用“==”进行比较
 会返回一个人true;

	     alert(undefined==null);//true
    	 alert(undefined===null);//false，数据类型不同

 - 没必要将变量声明为undefined,声明空对象应将值赋给null
 
    	var a=null;

## boolean

 - true为真，false为假
 - true不一定为1，false不一定为0，会发生转换类型但不同
 
	 		 alert(true==1);//true
			 alert(true===1);//false
			 alert(false==0);//true
			 alert(false===0);//false
 
 - 使用Boolean()进行转换
 	- 转换为true
 	
     		任何非空字符串
    
    		任何非0数值
    
    		任何非空对象 null和undefined会转换为false
    		
    		 alert(Boolean(undefined));
    
    		 alert(Boolean(null));


	 - 转换为false

			空字符串
			
			0以及NaN
			
			null以及undefined

## String

### 特性
 - 由0个或多个16位Unicode字符组成
 - 单引号和双引号不能交叉
 - 可以使用.length属性访问字符串长度
	 - 转义序列表示一个字符
	 - 无法精确返回双字符长度(汉字占两个字节)
    
    	 		str="abc a\x675";
    			alert(str);//abc ag5
    			alert(str.length);//7  \x67为16进制转义字符
 - 字符串一旦被创建，其值不能改变，若要改变必须销毁原有的字符串

		var lang = “Java”;
		lang = lang + “Script”
		实现这个操作的过程如下：首先创建一个能容纳10个字符的新字符串，然后在这个字符串中填充“Java”和“Script”,最后一步是销毁原来的字符串“Java”和“Script”,因为这两个字符串已经没用了。但是在低版本的浏览器(如IE6)中，字符串拼接速度是很消耗一个性能的过程。

### 转义序列
 - \n 换行 \t 制表符
 - \b 空格 \r 回车
 - \f 分页符 \\反斜杠\
 - \'单引号 \" 双引号
 - \xnn 十六进制数,n 代表0~F
 - \unnnn 以十六进制表示一个Unicode字符

### 类型转换
 - toString
	 - 使用的类型：number boolean String object;
	 - 参数:2,8,16,10 进制转换后变字符串

			/*var a=289;
			alert(a.toString());
			alert(a.toString(2));
			alert(a.toString(8));
			alert(a.toString(10));
			alert(a.toString(16));*/
			var a=null;
			var b=undefined;
			var c=NaN;
			var d=new Object();
			var e=true;

			//alert(a.toString())// Cannot read property 'toString' of null
			//alert(b.toString())// Cannot read property 'toString' of undefined
			alert(c.toString())//NaN
			alert(d.toString())//object
			alert(e.toString())//true

 - String()
	 - null
	 - nudefined
	 		
			var b=undefined;
			var c=NaN;
			var d=new Object();
			var e=true;

			alert(String(1));//1
			alert(String(b));//undefined
			alert(String(c));//NaN
			alert(String(d));//object
			alert(String(e));//true
 - eval()
	 - 计算字符串表达式的值或代码片段并以**数值**的形式返回
		
			eval("x=10;y=20;document.write(x*y)");//200

			document.write("<br>" + eval("2+2"));//4

			document.write("<br>" + eval(x+17));//27



## number

### 进制
 - 十进制
 - 八进制
	 - 前导：0
	 - 有效序列：0~7
	 - 超出范围
		 - 前导0被忽略
		 - 后续数值以十进制计数
 - 十六进制
	 - 前导：0x或者0X
	 - 有效序列0~F
 
### 浮点数
 - 小数后面至少一位
 - 科学计数法
	 - 小数点后有6个0的浮点数
	 - 以e或者E为底*10的N次幂
 - 最高的进度
	 - 17位小数
 - 缺陷
	 - 存在舍入误差
	 - 无法测试特定的浮点数值

### 数值范围
 - 最小大值
	 - Number.MIN_VALUE;
	 - Number.Max_VALUE;
 - 超出范围
	 - 正无穷
		 - Infinity
		 - Number.POSITIVE_INFINITY
	 - 负无穷
		 - -Infinity
		 - Number.NEGATIVE_INFINITY
	 - 缺陷
		 - 无法参与下一次计算
	 - 检测方法
		 - isFinite()
			 - 超出：false
			 - 合法:true

### NaN
 - 含义
	 - Not a Number
	 - 非数值
 - 特性
	 - 任何涉及NaN操作都将返回NaN
	 - NaN与任何数值都不等（包括自己）
 - 检测
	 - isNaN()
		 - 可转换数值:(false)
		 - 不能:true
### 数值转换

#### Number()
 - Boolean
	 - true:1
	 - false:0
 - null
	 - 0
 - undefined
	 - NaN
 - String
	 - 只包含数字或有效浮点格式
		 - 十进制数
		 - 前导0忽略
	 - 包含有效十六进制数格式
		 - 相同大小的十进制数
	 - 空字符串
		 - 0
	 - 其他格式字符串
		 - NaN
	
    			var a="12asd";
    
    			alert(Number(a));//NaN

 - object
	 - valueOf()：返回对象的原始值
	 - toString()

### paseInt()
 - 特性
	 - 忽略前置空格
	 - 直接找到第一个非空格字符
		 - 不是数值或负号：NaN
		 - 数字字符
			 - 解析数字字符
			 - 遇到非数字字符结束	
 - 参数
	 - 参数1:解析的字符
	 - 参数2：转换时的进制
 
#### parseInt()
 - 从第一个字符开始解析
 - 遇到无效字符结束
 - 只有第一个小数点有效
 - 忽略前导0
 - 十六进制始终为0
 - 没有小数点或者小数点后全为0：转换整数

# object
 - 定义：一组数据或功能的集合
 - 声明: var o=new Object();
 - 属性与方法
	 - Constructor:用于返回创建的当前对象的函数

    			var d=new Date(); 
    			alert(d.constructor);//function Date() { [native code] }
	 - hasOwnProperty(propertyName):是用来判断一个对象是否有你给出名称的属性或对象。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员
	 - isPrototypeOf(object):检测传入的对象是否是另一额对象的原型
	 - propertyIsEnumerable(propertyName):检测给定属性能否用for-in语句枚举
	 - toLocalString():返回对象的字符串表示，该字符串与执行环境的地区对应
	 - toString()返回对象的字符串表示
	 - valueOf()返回对象的字符串，数值或者布尔值：通常与toString()的值相同
	 
				
			
	 
	

			
	 		
			

	
	
 

			

