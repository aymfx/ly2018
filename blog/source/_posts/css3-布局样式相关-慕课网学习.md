---
title: css3-布局样式相关-慕课网学习
date: 2016-07-21
tags: html
---

# Columns

### 语法：
	columns：<column-width> || <column-count>

### 参数说明

<column-width>  主要用来定义多列中每列的宽度

<column-count>  主要用来定义多列中的列数

# column-width
属性值：
auto
如果column-width设置值为auto或者没有显式的设置值时，元素多列的列宽将由其他属性来决定，比如前面的示例就是由列数column-count来决定。
length
使用固定值来设置元素列的宽度，其主要是由数值和长度单位组成，不过其值只能是正值，不能为负值。

# column-count
属性值
auto
此值为column-count的默认值，表示元素只有一列，其主要依靠浏览器计算自动设置
integer
此值为正整数值，主要用来定义元素的列数，取值为大于0的整数，负值无效。

# column-gap
normal

默认值，默值为1em（如果你的字号是px，其默认值为你的font-size值）。

length>

此值用来设置列与列之间的距离，其可以使用px,em单位的任何整数值，但不能是负值。

# column-rule
属性值
column-rule-width

类似于border-width属性，主要用来定义列边框的宽度，其默认值为“medium”，column-rule-width属性接受任意浮点数，但不接收负值。但也像border-width属性一样，可以使用关键词：medium、thick和thin。

column-rule-style

类似于border-style属性，主要用来定义列边框样式，其默认值为“none”。column-rule-style属性值与border-style属值相同，包括none、hidden、dotted、dashed、solid、double、groove、ridge、inset、outset。

column-rule-color

类似于border-color属性，主要用来定义列边框颜色，其默认值为前景色color的值，使用时相当于border-color。column-rule-color接受所有的颜色。如果不希望显示颜色，也可以将其设置为transparent(透明色)

# column-span
属性值
none

此值为column-span的默认值，表示不跨越任何列。

all

这个值跟none值刚好相反，表示的是元素跨越所有列，并定位在列的Ｚ轴之上。

# W3C标准盒模型

### 外盒尺寸计算（元素空间尺寸）

element空间高度＝内容高度＋内距＋边框＋外距

element空间宽度＝内容宽度＋内距＋边框＋外距

### 内盒尺寸计算（元素大小）

element高度＝内容高度＋内距＋边框（height为内容高度）

element宽度＝内容宽度＋内距＋边框（width为内容宽度）

#IE传统下盒模型（IE6以下，不包含IE6版本或”QuirksMode下IE5.5+”）

### 外盒尺寸计算（元素空间尺寸）

element空间高度＝内容高度＋外距（height包含了元素内容宽度、边框、内距）

element宽间宽度＝内容宽度＋外距（width包含了元素内容宽度、边框、内距）

### 内盒尺寸计算（元素大小）

element高度＝内容高度（height包含了元素内容宽度、边框、内距）

element宽度＝内容宽度（width包含了元素内容宽度、边框、内距）

# box-sizing(css3新自定义盒子属性)

### box-sizing: content-box | border-box | inherit

属性值
content-box
默认值，其让元素维持W3C的标准盒模型，也就是说元素的宽度和高度（width/height）等于元素边框宽度（border）加上元素内距（padding）加上元素内容宽度或高度（content width/ height），也就是element width/height = border + padding + content width / height

border-box
重新定义CSS2.1中盒模型组成的模式，让元素维持IE传统的盒模型（IE6以下版本和IE6-7怪异模式），也就是说元素的宽度或高度等于元素内容的宽度或高度。从上面盒模型介绍可知，这里的内容宽度或高度包含了元素的border、padding、内容的宽度或高度（此处的内容宽度或高度＝盒子的宽度或高度—边框—内距）。

inherit
使元素继承父元素的盒模型模式






