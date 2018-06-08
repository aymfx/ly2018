---
title: html--三栏布局（两边固定宽度，中间自适应）
date: 2016-07-05 14:13:22
tags: html
---

## 一、绝对定位法：左右两栏采用绝对定位，分别固定于页面的左右两侧，中间的主体栏用左右margin值撑开距离。于是实现了三栏自适应布局。

``` bash
     #left{
         width: 180px;
         height: 100%;      
         background: blue;
         position: absolute;
         left: 0px;
         top: 0px;
      }
	  #middle{
           background: red;
           margin: 0 200px;
		   height: 100%;

	  }
	  #right{
		width: 180px;        
         background: blue;
         position: absolute;
         right: 0px;
         top: 0px;
         height: 100%;    
	  }
``` 
> 此方法的优点在于：理解容易，上手简单，受内部元素影响而破坏布局的概率低，就是比较经得起折腾。
> 缺点在于：如果中间栏含有最小宽度限制，或是含有宽度的内部元素，当浏览器宽度小到一定程度，会发生层重叠的情况

## 二、自身浮动法：左栏左浮动，右栏右浮动，中间栏放最后。
	
	

``` bash
#left{
         width: 180px;
         height: 100%;      
         background: blue;
         float: left;
      }
	  #middle{
		  background: red;
           margin: 0 200px;
		   height: 100%;
	  }
	  #right{
         width: 180px;
         height: 100%;      
         background: blue;
         float: right;
	  }
```
   这种方式需要注意三个div的顺序，左右两栏的顺序不分先后，但是中间一栏必须放在最后。
     此方法的优点是：代码足够简洁与高效
     缺点是：中间主体存在克星，clear:both属性。如果要使用此方法，需避免明显的clear样式。
     
## 三、margin负值法：左右两栏均左浮动，左右两栏采用负的margin值。中间栏被宽度为100%的浮动元素包起来。
	  

``` bash
 #middle{
	   	    width: 100%;
	   	    float: left;
	   }
	   #main{
	   	    background: red;
	   	    margin: 0 200px;
	   	    height: 100%;
	   }
	   #left{
             width: 200px;
             float: left;
             margin-left: -100%;
             height: 100%;
             background:blue;

	   }
	     #right{
             width: 200px;
             float: left;
             margin-left: -200px;
             height: 100%;
             background:blue;
             
	   }
```
> 此方法的优点在于：三栏相互关联，可谓真正意义上的自适应，有一定的抗性——布局不易受内部影响。
缺点在于：相对比较难理解些，上手不容易，代码相对复杂。出现百分比宽度，过多的负值定位，如果出现布局的bug，排查不易。
   

``` bash
第一种和第二种方法的div排版
<div id="middle"></div>
<div id="left">xsxsx</div>
<div id="right">xsxsx</div>
```
``` bash
第三种方法的div排版
<div id="middle">
   	    <div id="main">aaaaaaaaa</div>
   </div>
   <div id="left">vvvvvvvvvvv</div>
   <div id="right">ccccccccccccc</div>
```
