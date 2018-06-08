---
title: javascipt字符串函数
date: 2016-08-03
tags: javascript
---

# 查找方法
## 字符方法
 - charAt()
	 - 功能:返回字符串第n个字符
	 - 参数:超出范围-返回空字符串
	 - 返回值:string中第n个字符的实际值

```
			var str="assddsddsad";
			console.log(str.charAt(3));//d
			console.log(str.charAt(20));//什么没有 空
```

 - charCodeAt()
	 - 功能:返回字符串中第n个字符的代码
	 - 参数：num ----超出范围返回NaN
	 - 返回值:
		 - 内容：string中第n个字符的Unicode编码
		 - 范围:0~65535之间的16位整数

```
				var str="assddsddsad";
				console.log(str.charCodeAt(3));//100
				console.log(str.charCodeAt(20));//NaN
```

 - fromCharCode()
	 - 功能：根据字符串编码创建字符串
	 - 参数:0个或多个整数 代表字符Unicode编码
	 - 返回值:由指定编码字符组成的新字符串
	 - 特性:静态方法,实为构造函数String()的属性

```
			console.log(String.fromCharCode(520));//Ȉ
			console.log(String.fromCharCode(880));//Ͱ
```

## 位置方法
 - indexOf():从前向后检索字符串,看其是否含有指定子串
 - lastIndexOf()：从后向前检索字符串,看其是否含有指定子串
 - 共性
	 - 功能:根据指定字符串查找下标位置
	 - 参数
		 - 必选：将要查询的自字符串
		 - 可选:开始查找的位置下标
			 - 值为负数:视作0
			 - 省略:从默认位置开始
			 - 超出0-length-1,返回-1
	 - 返回值
		 - 找到:子串首次出现的下标
		 - 未找到:返回-1

```
					var str="asdalove";
					console.log(str.indexOf("2"))//-1
					console.log(str.indexOf("2",8))//-1
					console.log(str.indexOf("a",2))//3
					console.log(str.indexOf("a",0))//0
					console.log(str.lastIndexOf("a",0))//0
					console.log(str.lastIndexOf("a",2))//0
					console.log(str.lastIndexOf("a",-100))//0
					console.log(str.lastIndexOf("a",20))//3 
					console.log(str.lastIndexOf("a",2))//0
```

## 匹配方法
 - match()
	 - 功能:找到一个或多个正则表达式的匹配
	 - 参数
		 - 要进行模式匹配的正则表达式
		 - 非正则表达式-将其传递给RegExp()构造函数，并转换为正则表达式的对象
	 - 返回值：存放匹配结果的数组
		 - 有全局标记g
			 - 执行全局检索
				 - 找到：返回数组
					 - 内容:所有匹配的子串
					 - 缺陷:
						 - 没有派生属性
						 - 不提供与子表达式匹配的文本信息
						 - 不声明每个匹配子串的位置
					 - 弥补:使用RegExp.exec()方法
				 - 没找到:返回null
		 - 无全局标记g
			 - 执行一次匹配
				 - 找到：返回数组
					 - 内容
						 - 第0个元素：匹配文本
						 - 其他元素：与正则表达式匹配的文本
					 - 属性
						 - input:调用该方法的字符串对象
						 - index:匹配为本的起始字符在字符串的位置
						 - lastIndex:匹配为本的末尾字符在字符串的位置
				 - 没找到:返回null

```
						var str = "The rain in SPAIN stays mainly in the plain";
						console.log(str.match(/ain/g));//["ain", "ain", "ain"]
						console.log(str.match(/ain/gi));//["ain", "AIN", "ain", "AIN"]   i可以保证不区分大小写
						console.log(str.match(/ain/));//["ain", index: 5, input: "The rain in SPAIN stays mainly in the plain"] 
```

 - search()
	 - 功能:检索字符串中正则表达式匹配的子串
	 - 参数:与match()相同
	 - 返回值
		 - 找到:字符串中第一个与正则表达式相匹配的子串的起始位置
		 - 未找到:返回-1
	 - 特性:忽略全局标记g和lastIndex()属性

```
			var str = "The rain in SPAIN stays mainly in the plain";
			console.log(str.search("in"));//6
```

 - replace()
	 - 功能:替换一个正则表达式匹配的子串
	 - 参数
		 - 参数1：需要进行替换正则表达式对象或字符串
		 - 参数2:替换文本或替换函数
	 - 特性
		 - 如果参数1仅为字符串则只进行一次匹配替换，若代替所有的子串则必须制定全局标记g
		 - 如果参数2仅为字符串则可使用特殊字符序列
			 - $$==$
			 - $&==匹配整个模式的子字符串
			 - $'==匹配的自字符串之前的子字符串
			 - $`==匹配的子字符串之后的子字符串
			 - $n==匹配第n个捕获的子字符串 n=0~9
			 - $nn==匹配第nn个捕获的子字符串 n=01~99

```
					var str='i love you';
					console.log(str.replace('i','liuyang'));
```

 - split
	 - 功能:根据指定的分割符将字符串分割成多个子串，并返回成数组
	 - 参数
		 - 必须:指定的分隔符
		 - 可选：指定数组的长度

```
				var str = "The rain in SPAIN stays mainly in the plain";
				console.log(str.split(" "));["The", "rain", "in", "SPAIN", "stays", "mainly", "in", "the", "plain"]
```

# 操作方法
## 拼接方法
 - concat
	 - 语法:string.concat(value,....)
	 - 功能:链接字符串
	 - 参数:要链接到string上的一个或多个值
	 - 返回值:把所有参数都连接到字符串string上得到的新字符串
	 - 特性：功能与"+"相同原始字符串的实际值并未正真被修改
		
```
			   var str1="i";
			   var str2=" love ";
			   var str3="you";
			   console.log(str1.concat(str2,str3));//i love you
```

## 截取方法
### 根据下标截取子串
 - slice()
	 - 参数1：必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
	 - 参数2：可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
 	

```
			 var str="abcdefghijk";
			 console.log(str.slice(-7,-5))//4 6  ef
			 console.log(str);//abcdefghijk
```

 - substring()
	 - from:	必需。一个非负的整数，规定要提取的子串的第一个字符在 string Object 中的位置。
	 - to:	可选。一个非负的整数，比要提取的子串的最后一个字符在 string Object 中的位置多 1。如果省略该参数，那么返回的子串会一直到字符串的结尾。

```
			var str="Hello world!";
			document.write(str.substring(3)+"<br>");//lo world!
			document.write(str.substring(3,7));//lo w
```

### 根据长度截取子串
 - substr()
	 - start:	必需。要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
	 - length:可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。

```
			var str="abcdefghijk";
			console.log();
			console.log(str.substr(2,3));//cde
			console.log(str.substr(-20,5));//cdefghijk  从0开始
			console.log(str.substr(-2,5));//jk
			console.log(str.substr(2,20));//cdefghijk
```

## 空格处理
 - trim 清除前置及后置空格
 - trimLeft:清除前置空格
 - trimRight：清除后置空格

## 比较方法：localeCompare()
 - localeCompare()
	 - 功能:用本地特定顺序比较两个字符串
	 - 参数:与原字符串进行比较的字符串
	 - 返回值:说明比较的数字
		 - 负数:原字符串<参数字符串
		 - 0：原字符串=参数字符串
		 - 正数:原字符串>参数字符串

```
				var str="北京";
				var var2="北京";
				var res=str.localeCompare(var2);
				console.log(res); //0
```

# 编码方法
# #字符串常规编码与解码
 - escape()
 - unescape()
## URI字符串编码与解码
 - encodeURI()
 - decodeURI()
## URI组件编码与解码
 - encodeURIComponent()
 - decodeURIComponent()

# 转换方式
## 大小写转换
### 转换为大写
 - toUpperCase();
 - toLocaleUpperCase()  本地
### 转换为小写
 - toLowerCase();
 - toLocaleLowerCase()本地
### 代码转换
 - 用js动态格式化html,但不具有语义性 ，舍弃


