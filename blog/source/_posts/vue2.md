---
title: vue2
date: 2016-11-08
tags: vue
---

<!--markdown--># 条件与循环
``` javascript

    <div id="app">
        <p v-if="seen">我是显示的</p>
        <p v-else>当条件不满足时我显示</p>
    </div>
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                seen: false
            }
        })
    </script>
```
> v-if v-else 这两个指令 进行条件的判断

``` javascript
<div id="app">
    <ul>
        <div v-for="(ingredient,i) in ingredients" :key="i">
            <h1>{{ingredient}}</h1>
            <p>({{i}})</p>
         </div>
    </ul>

    <ul>
        <li v-for="person in persons">
            
            <span v-for="(value,key,index) in person"> <!-- value 是键值,key是键名，index是下标-->
                {{key}}: {{value}}--{{index}}
            </span>

        </li>
    </ul>

    <span v-for="n in 10">{{n}},</span>
</div>
<script type="text/javascript" src="vue.js"></script>
<script type="text/javascript">
	new Vue({
		el:"#app",
		data:{
		   ingredients:['meat','fruit','cookies'],
           persons:[
               {name:'vane',age:38,color:'red'},
               {name:'rose',age:18,color:'blue'},
               {name:'jack',age:28,color:'green'}
           ]
		}
	})

</script>

``` 



> v-for 进行循环判断 

``` javascript
    <div id="app">
        <p>{{value}}</p>
        <button v-on:click="reserve">翻转字符串</button>
    </div>
    <script src="vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                value: 'Ｉ　ＬＯＶＥ　ＹＯＵ',
            },
            methods: {
                reserve() {
                    this.value = this.value.split('').reverse().join('');
                }
            }
        })
    </script>
```
>v-on 指令绑定一个事件监听器，通过它调用我们 Vue 实例中定义的方法

# 表单的指令

``` javascript

    <div id="app">
        <p>{{value}}</p>
        <input v-model="value" />
    </div>
    <script src="vue.js"></script>
    <script>
        var app = new Vue({
            el: '#app',
            data: {
                value: '家具',
            }
        })
    </script>
```
> v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定

# 组件化应用构建

> 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、自包含和通常可复用的组件构建大型应用。仔细想想，几乎任意类型的应用界面都可以抽象为一个组件树
![请输入图片描述][1]


  [1]: http://cn.vuejs.org/images/components.png

``` javascript
<div id="app">
        <ul>
            <todolist v-for="item in list" v-bind:todo="item"></todolist>
        </ul>
    </div>
    <script src="vue.js"></script>
    <script>
        Vue.component('todolist', {
            props: ['todo'],
            template: '<li>{{todo.text}}</li>'
        })
        var app = new Vue({
            el: '#app',
            data: {
                value: '家具',
                list: [{
                    text: '吃饭'
                }, {
                    text: '睡觉'
                }, {
                    text: '吃饭'
                }, {
                    text: '睡觉'
                }]
            }
        })
    </script>
```

