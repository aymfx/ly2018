---
title: jQuery源码学习（1）-总体架构
date: 2017-07-28 
tags: jquery
---

# 准备

> jquery技术内幕书籍

> jquery1.7.1源码

# 总体架构

## jquery的三个部分

> 入口模块

- 构造jQuery对象的jquery()

> 底层支持模块

- 工具方法Utilities
- 回调函数列表 Callbacks Object
- 异步队列Deferred Object
- 浏览器功能测试Support
- 数据缓存Data
- 队列Queue
- 选择器Sizzle

> 功能模块

- 属性操作 Attributes
- 事件系统 Events
- DOM遍历Traversing
- 样式操作css
    -  计算机样式& 内联样式
    -  坐标Offset
    -  尺寸Dimension
-  异步请求Ajax
-  动画Effects

## 整体的结构

> 源码整体结构  LY ===Jquery  自己改了下


```
(function(window, undefind) {
    //构造jQuery对象
    var LY = (function() {
        var LY = function() {
            return new LY.fn.init();
        }

        return LY;
    })();

    //一些基础的功能
    .....

    //将ly对象挂载到window下面

    window.LY = window.ly = LY;

})(window)

```

> 三种自执行匿名函数

- (function(){})()  //jquery采用的这种
- 
- (function(){}())
- 
- !function(){}();

> 为什么要传入 window以及undefined 在匿名函数里面

- 传入 window 变量，使得 window 由全局变量变为局部变量，当在 jQuery 代码块中访问 window时，不需要将作用域链回退到顶层作用域，这样可以更快的访问 window

- 将 window 作为参数传入，可以在压缩代码时进行优化
- 对于undefind也是如此，但是它最重要的原因是undefined的可能被重写值(在某些浏览器)

> 为什么在自执行函数前面加分号

 - 保障浏览器正确识别










