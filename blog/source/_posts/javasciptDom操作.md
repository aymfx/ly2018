---
title: javasciptDom操作
date: 2016-08-03
tags: javascript
---
# 获取节点
## document
 - getElementById
	 - 通过id属性获取节点（object）
 - getElementsByName
	 - 通过names属性获取节点(类数组)
 - getElementsByTagName
	 - 通过元素标签获取元素(类数组)
 - getElementsByClassName
	 - 通过class属性获取节点(类数组)ie8不兼容
 
## 节点指针
 - firstChild
	 - 语法:父节点.firstChild
	 - 功能:获取元素首个子节点
 - lastChild
	 - 语法:父节点.lastChild
	 - 功能:获取元素的最后一个字节点
 - childNodes
	 - 语法:父节点.childNodes
	 - 功能:获取元素子节点列表
 - previousSibling
	 - 语法:兄弟节点.previousSibling
	 - 功能:获取已知节点的前一个节点
 - nextSibling
	 - 语法:兄弟节点.nextSibling
	 - 功能:获取已知节点的后一个节点
 - parentNode
	 - 语法:子节点.parentNode
	 - 功能:获取已知节点的父节点

# 节点操作
## 创建节点
 - createElement
	 - 语法:document.createElement（元素标签）
	 - 功能:创建元素节点
 - createAttribute
	 - 语法:document.createAttribute（元素属性）
	 - 功能:创建属性节点
 - createTextNode
	 - 语法:document.createTextNode(文本内容)
	 - 功能:创建文本节点
## 插入节点
 - appendChild(所要添加的节点)
	 - 向子节点列表末尾添加新的子节点
 - insertBefore(所要添加的节点，已知的节点)
	 - 在已知的节点插入新的节点，如果没有可以写null；

```
    			var div=document.getElementById('myDiv');
    			var odi=document.createElement('div');
    			var text=document.createTextNode('我不再爱你');
    			odi.appendChild(text);
    			div.insertBefore(odi,null);
```

## 替换节点
 - replaceChild(要插入的元素，将要替换的元素)
	 - 将一个节点替换成另一个

## 复制节点
 - cloneNode
	 - 语法：需要被复制的节点.cloneNode(true/false)//默认为false
	 - 功能:创建指定节点副本
	 - 参数
		 - true:复制当前节点以及所有子节点
		 - false:仅复制当前节点
## 删除节点
 - removeChild(删除的节点)
	 - 删除指定的节点
 
## 属性操作
 - 获取属性：getAttribute(元素属性名)
	 - 获取元素节点中指定的属性值
 - 设置属性: setAttribute(属性名,属性值)
	 - 创建或元素节点的属性
 - 删除属性: removeAttribute（属性名）
	 - 删除元素中指定的属性

## 文本操作
 - insertData(offset,String):从offset指定的位置插入string		
 - appendData(string):将string插入到文本节点的末尾处
 - deleteDate(offset,count) 从off将count个字符用string替代
 - replaceData(off,count,string);从off将count个字符用string替代
 - splitData(offset) 从offset起将文本节点分成两个节点
 - substring(offset,count) 返回由offset起的count个节点
 
