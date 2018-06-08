---
title: javascipt数组
date: 2016-07-28
tags: javascript
---
# JavaScript数组
## 创建方法
 - 构造函数对象创建
	 - 空数组：var obj=new Array();
	 - 指定长度:var obj=new Array(size);
	 - 指定元素：var obj=new Array(value1,....,valuen);
	 
 - 字面量对象创建
	 - 单维数组：var obj=[value1,value2,....,valuen];
	 - 多维数组：var obj=[[v1,v2],[v1,v2],[v1,v2]]；

## 基本操作
 - 存取数组
	 - 单维数组:数组名[下标索引]
	 - 多维数组:数组名[外层下标][内层下标]
	 - 特性
		 - 数组长度是弹性的,可以自由伸缩
		 - 数组下标从零开始
		 - 下标类型
			 - 数值
			 - 非数值
				 - 转换成字符串(数字字符会转成数字)
				 
```
    			  var arr=[];
    
    			  arr["10"]=0;
    
    			  alert(arr.length);//11

				  alert(arr[10]);//0

			      var arr1=[];
    
    			  arr1["a"]="hah";
```
    
```
    			  arr1["b"]="asd";
    			  alert(arr1.length);//0
    			  alert(arr1["b"])//asd
```

				 - 生成关联数组
				 
```
					arr["name"] = "mary";  
  
					arr["age"] = "3";  
  
					arr["sex"] = "man";
  
```
				 - 下标将作为对象属性的名字
				 
				 - Javascript数组下标值的范围为0到2的32次方。对于任意给定的数字下标值，如果不在此范围内，js会将它转换为一个字符串，并将该下标对应的值作为该数组对象的一个属性值而不是数组元素，例如array[-1] = "yes" 其实就相当于给array对象添加了一个名为-1的属性，属性值为yes。如果该下标值在合法范围内，则无论该下标值是数字还是数字字符串，都一律会被转化为数字使用，即 array["100"] = 0 和 array[100] = 0 执行的是相同的操作。 
		 - 数组元素可以添加到对象中
 - 增加数组：使用[]运算符指定新的下标
 - 删除数组:delete 数组名[下标]
 

```
    		 	  var arr1=[];
    			  arr1["a"]="hah";
    			  arr1["b"]="asd";
     			  console.log(arr1)//[a: "hah", b: "asd"]
    			  delete arr1["a"];
    			  alert(typeof arr1);
    			  console.log(arr1);//[b: "asd"]
```

 - 遍历数组:for(var 数组元素变量 in 数组)

```
    	var arr1=[];
    	arr1["a"]="hah";
    	arr1["b"]="asd";
    	arr1["c"]="asd";
    	
    	for (var x in arr1) {
    	document.write(x+":"+arr1[x]);//a:hahb:asdc:asd
    	}
```

## 数组属性
 - constructor:引用数组对象的构造函数
		
```
    			var arr=new Array();
    			var arr1=[];
    			alert(arr.constructor)//function Array() { [native code] }
    			alert(arr1.constructor)//function Array() { [native code] }
```

 	
 - length:返回数组的长度
	 - 数组下标必须是数字，或者数字字符，否则length为0

```
    			  var arr1=[];
    			  arr1["a"]="hah";
    			  arr1["b"]="asd";
     			  arr1["c"]="asd";
     			  alert(arr1.length)//0
```

 - prototype:通过增加属性和方法扩展数组定义

```
    function array_max( )
    {
       var i, max = this[0];
       for (i = 1; i < this.length; i++)
       {
       if (max < this[i])
       max = this[i];
       }
       return max;
    }
    Array.prototype.max = array_max;
    var x = new Array(1, 2, 3, 4, 5, 6);
    var y = x.max( );//y=6
```

## ECMAScript 3方法

### 添加
 - push():在数组末尾添加元素
 - unshift():在数组头部添加元素
 - cancat() 合并两个数组
### 删除
 - pop() 删除并返回最后一个元素
 - shift()删除并返回第一个元素

### 子数组
 - splice()
	 - 删除任意数量的项
		 - 要删除的起始下标
		 - 要删除的项数
		 
```
      			 var arr=[1,2,3,4,5,6];
     			   alert(arr.splice(1,2));//23
     			   alert(arr);//1456
```
	 
	
	-  在指定位置插入指定项
		 - 起始下标
		 - 0(不删除)
		 - 要插入的项
		 	
```
    			  var arr=[1,2,3,4,5,6];
     			  alert(arr.splice(2,0,"a"));//
     			  alert(arr);//12a3456
```
	 - 替换任意数量的项
		 - 起始下标
		 - 要删除的项数
		 - 要插入的项

```
    				var arr=[1,2,3,4,5,6];
     			  alert(arr.splice(2,2,"a","b"));//34
     			  alert(arr)//12ab56
 - slice
```
	 - 功能：从已有的数组中选取部分元素构成新数组
	 - 参数：起始位置，结束位置
	 - 特性:
		 - 如果是负数，则用数组长度加上该值的确定位置
		 - 起始位置开始截取
		 - 结束位置的前一个

```
    			  var arr=[1,2,3,4,5,6];
     			  var newarr=arr.slice(-5,-3);
     			  alert(newarr);//23
     			  alert(arr);//12345
```

### 数组排序

 - reverse()颠倒数组中元素的顺序
 - sort():对字符数组或者数字数组进行排序
	 - 特性
		 - 默认按字符串进行比较
		 - 按数值大小比较需要函数支持

```
    			var arr=[1,5,8,5,6,7];
    
     			 arr.sort(function(a,b){
     			 	return a-b;
     			 })
     			 alert(arr);//155678
```

### 数组转换
 - toString()转换为字符串并返回
 - toLocaleString()转换为本地格式字符串并且返回
 - join() 用于指定分割数组并将其转换成字符串
 

```
     			 var arr=[1,5,8];
     			 alert(arr);//1,5,8
     			 alert(arr.join(""));//158
     			 alert(arr);//1,5,8
```

 - split()分割字符串转换成数组

```
    			var str="abd";
    			alert(str);//abd
    			alert(str.split(""));//a,b,d
    			alert(str);//abd
```

## ECMAScript 5 方法

### 位置方法
 - indexOf:从数组的起始位置开始查找
 

```
    			var arr=["a","b","c"];
    			alert(arr.indexOf("c",1));//2
```

 - lastIndexOf:从数组的结束位置开始查找
 			

```
    			var arr=["a","b","c"];
    			alert(arr.lastIndexOf("a",1));//0
```

 - 参数:
	 - 要查找的项
	 - 表示查找起点的位置索引

### 迭代方法
 - every：如果该函数对每一项都返回true,则返回true
 

```
	 		var ages = [32, 33, 16, 40];

			function checkAdult(age) {
			return age >= 18;
			}
```

			document.write(ages.every(checkAdult)+" ");//fasle
 - filter:返回值为true的所有数组成员
 

```
			var ages = [32, 33, 16, 40];

			function checkAdult(age) {
			return age >= 18;
			}
					document.write(ages.filter(checkAdult)+" ");//32,33,40
```

	

 - foreach：无返回值 
	 - 第1个是遍历的数组内容；第2个是对应的数组索引，第3个是数组本身

```
    	[1, 2 ,3, 4].forEach(alert);
```

 - map:返回每次函数调用的结果数组
 

```
			 var ages = [32, 33, 16, 40];

			function checkAdult(age) {
			return age+=18;
			}
```

```
			document.write(ages.map(checkAdult)+" ");//50,51,34,58
```

 - some:有任意一项返回true,则返回true
 	

```
			var ages = [32, 33, 16, 40];

			function checkAdult(age) {
			return age>18;
			}

			document.write(ages.some(checkAdult)+" ");//true
```
	
 - 参数
	 - 接收参数
		 - 要在每一项上运行的函数
		 - 运行该函数的作用域对象
	 - 传入参数
		 - 数组项的值item
		 - 该项在数组中的位置index
		 - 数组对象本身array
 
### 缩小方法
 - reduce:从数组起始位开始遍历
	 - previousValue（上一次调用回调函数时的返回值，或者初始值）
	 - currentValue（当前正在处理的数组元素）
	 - currentIndex（当前正在处理的数组元素下标）
	 - array（调用reduce()方法的数组）
	 
``` bash
    			var arr = [1,2,3,4];
    			alert(arr.reduce(function(pre,cur){return pre + cur}) );// return 10
```
	 - 对比:
    
``` bash
		    var arr = [1,2,3,4];
		    sum = 0;
		    arr.forEach(function(e){sum += e;}); // sum = 10  just for demo

    			var arr = [1,2,3,4],
    			sum = 0;
    			arr.map(function(obj){sum += obj});//return undefined array. sum = 10
``` 


 - reduceRight:从数组末尾开始遍历
    
``` bash
    			var arr = [1,2,3,4];
    			alert(arr.reduceRight(function(pre,cur){return pre + cur}) );
```

 - 参数
	 - 接收参数
		 - 每一项上调用的函数
		 - 作为缩小基础的初始值
	 - 传入参数
		 - 当前一值 prev
		 - 当前值 cur
		 - 项的索引 index
		 - 数组对象 array




		
    		
	

