---
title: js的严格模式总结
date: 2016-07-29
tags: javascript
---

	
	//变量  要声明
```
	/*"use strict";
	a='liuynag';
	console.log(a);//Uncaught ReferenceError: a is not defined*/
```

   
   	//不能调用delete 

```
// 	"use strict";
   	/*var color='red';
 	console.log(color);
   	delete color;//Delete of an unqualified identifier in strict mode.
   	console.log(color);*/
```

   	
   	//不能将保留字作为变量名

```
   	 /*	"use strict"; 	
     	var public='hah';
     	console.log(public);//Unexpected strict mode reserved word*/
```
    
    //严格模式 对象重名属性报错
```
    /*"use strict"; 
     var person={
     	 	name:'hahhha',
     	 	name:'greg'
     }
     console.log(person.name);//编辑器报错，浏览器没有*/
```
    
    //重名参数
  

```
  /*"use strict"; 
    	function a(num,num){
    		  console.log(num);// Duplicate parameter name not allowed in this context
    		  console.log(arguments[1]);
    		  console.log(a.length);
    		  
    	}
    	a(11,12);*/
```
    	
    //arguments对象
```
	//  "use strict"; 
    	/*function a(num,num1){
              num=2;
               console.log(arguments[0]);//严格11 不严格 2
    	}
    	a(11,12);*/
```
    
    //淘汰了arguments.callee arguments.caller  
	

```
//  "use strict"
	/*function factorial(num){
		if(num<=1){
			 return 1;
		}else{
			return num*arguments.callee(num-1);
		}
	}
	console.log(factorial(5));//'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them*/
```
	
	//严格模式下 if语句不能创建函数  预编译不会提到if语句外
```
		/*"use strict"
		if(true){
			  function dosomething(){
			  	   console.log("好像没出错");
			  }
		}else{
			  //写完
		}
		dosomething();//ReferenceError: dosomething is not defined*/
```
		
	//eval()，它将不再包含上下文中创建函数或者变量；
```
	/*"use strict"
	function dosomething(){
		  eval("var x=10");
		  console.log(x);//: x is not defined
	}
	
	dosomething()*/
```
	
	//eval()在严格模式下只有在被求值的特殊作用域下有效，随后被销毁
```
	/*"use strict"
	var result=eval("var x=10,y=11;x+y");
	alert(result);//21*/
```
	
	//抑制this
```
	/*"use strict"
	var color='red';
	function color1(){
		  console.log(this.color);
	}
	color1(null);//严格Cannot read property 'color' of undefined 不严格 red*/
```
	
	//抛弃了with语句
```
	/*"use strict"
	   with(location){
	   	   alert(href);////严格Strict mode code may not include a with statement不严格  一段地址
	   }*/
```
	  
	
	//抛弃8进制，0开头不属于8进制
	

```
	/*"use strict";
		var value='010';
		console.log(parseInt(value));//不严格8 严格10*/
```
	
	
		
	
	
   
    



