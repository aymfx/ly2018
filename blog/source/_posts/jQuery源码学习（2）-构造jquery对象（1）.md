---
title: jQuery源码学习（2）-构造jquery对象（1）
date: 2017-07-29 
tags: jquery
---

# 构造函数jQuery

> jQuery(select [,context])

 - 第一个参数是选择器，用于选择docunment里面的html元素，当传入的参数不是选择器时，会返回一个空的jquery对象
 - 第二个是上下文对象，也就是限制从哪个范围开始查找元素，默认从document
 - 当指定了第二个参数，实际上就是调用了$(selsect).find(xxx)

> jQuery(html[,ownerDocument])、jQuery(html,props)

 - html 表示如果是html代码，jquery将其转换成一个jquery对象，可以进行插入dom 操作
     - 类似于:$("<div>ly</div>").appendTo('body'),可以是单标签
 - ownerDocument 表示可以创建新的文档对象，默认当前文档
 - props 必须是单标签写法

```
$("<div/>", {　　　　
            "class": "test",
            　　　　text: "Click me!",
            　　　　click: function() {　　　　
                $(this).toggleClass("bar");　　　
            }　　
        }).appendTo("body");
```

> jQuery(element) jQuery(elementArray)

 - 该方法是将dom元素封装成jquery元素然年调用jquery方法
 - 多用于事件的监听


```
$('div').click(function(){
    $(this).show();
})
```

> jQuery(object)
  - 对于普通的js对象也可以包装成jquery对象的


```
var names = {
            first: 'liu',
            last: 'yang'
        }
        var $names = $(names);
        console.log($names);
        $names.on('binds', function() {
            console.log('我叫', $names[0].first + $names[0].last);
        })
    $names.trigger('binds'); //自动触发
```
>  jQuery(callback) 

 - 如果传入一个函数，在document绑定一个ready事件监听函数，当dom加载时执行
 - ready比load早执行，不是原生函数,它由DOMContentLoaded事件onreadystatechange事件以及函数doScrollCheck()的统称


> jQuery(jQuery object)

 - 如归传入的是jquery对象，会创建一个一样的副本，并且返回，他们引用的同一个地址

 
> jQuery()

 - 不传参则返回一个空的jquery对象
 

## jQuery.fn.init(selector,context,rootjQuery)

> 12个分支

 - 也就是有12种处理方式的写法，具体参考书吧
 - 以下也有讲解

> selector:接收的是dom对象

> context : 上下文对象

> rootjQuery

 - 用于以下情况




```
//id查找失败
if (elem.id !== match[2]) {
    return rootjQuery.find(selector);
    }

//selector是选择器且没有context

if (!context || context.jquery) {
        return (context || rootjQuery).find(selector);
    }

//selector是函数

if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
    }

//怎么定义rootjQuery？
 rootjQuery = jQuery(document);

//如果判断选择器是false，返回的是空的$();
    if (!selector) {
        return this;
    }
    
//如果字符串是body，则获取document.body
    if (selector === "body" && !context && document.body) {
        console.log("是我呀");
        this.context = document;
        this[0] = document.body;
        this.selector = selector;
        this.length = 1;
        return this;
    }
    


//用于匹配html代码以及id,第一个是selector 第二个是html或者undefind 
    quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,


//  匹配单标记

 rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,

```






