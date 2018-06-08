---
title: vue实例
date: 2016-11-03
tags: vue
---

<!--markdown--># vue实例
# 构造器
> 每个 Vue.js 应用都是通过构造函数 Vue 创建一个 Vue 的根实例 启动的

``` javascript
    var vm = new Vue({
    // 选项
    })
```
> 扩展 Vue 构造器，从而用预定义选项创建可复用的组件构造器

```javascript
    var MyComponent = Vue.extend({
    // 扩展选项
    })
    // 所有的 `MyComponent` 实例都将以预定义的扩展选项被创建
    var myComponentInstance = new MyComponent()
```
# 属性与方法

 > data 属性
 ``` javascript
        var data = { a: 1 }
        var vm = new Vue({
        data: data
        })
        vm.a === data.a // -> true
        // 设置属性也会影响到原始数据
        vm.a = 2
        data.a // -> 2
        // ... 反之亦然
        data.a = 3
        vm.a // -> 3
```
>Vue 实例暴露了一些有用的实例属性与方法。这些属性与方法都有前缀 $，以便与代理的 data 属性区分

``` javascript
    var data = { a: 1 }
    var vm = new Vue({
    el: '#example',
    data: data
    })
    vm.$data === data // -> true
    vm.$el === document.getElementById('example') // -> true
    // $watch 是一个实例方法
    vm.$watch('a', function (newVal, oldVal) {
    // 这个回调将在 `vm.a`  改变后调用
    })
```
>注意，不要在实例属性或者回调函数中（如 vm.$watch('a', newVal => this.myMethod())）使用箭头函数。因为箭头函数绑定父上下文，所以 this 不会像预想的一样是 Vue 实例，而是 this.myMethod 未被定义。

# 实例生命周期
```javascript
    var vm = new Vue({
    data: {
        a: 1
    },
    created: function () {
        // `this` 指向 vm 实例
        console.log('a is: ' + this.a)
    }
    })
    // -> "a is: 1"

```
![生命周期][1]


  [1]: http://cn.vuejs.org/images/lifecycle.png

原文:<a href="http://vuejs.org/guide/instance.html" target="_blank">
