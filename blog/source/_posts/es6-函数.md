---
title: es6-函数
date: 2018-04-06
tags:es6
---


![i.jpg](http://upload-images.jianshu.io/upload_images/10843623-f6bc1326e758c851.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 前言

> 杭州这周温度达到-5度了，温度下降的蛮快，年会排舞感觉好悬啊，不知到能拍出啥道道来,现在唯一的心愿就是，早点回家，冷也阻止不了我回家的脚步，嗯哼。

> 我的博客地址 ：http://www.aymfx.cn/

### 引子

> ES6函数的改变不算太大，都是一些其他语言早就有的功能，而Javascript一直比较欠缺的，比如函数参数默认值，任意参数的表示法，最大的变化应该是支持箭头函数(其他语言称之为LAMBDA表达式)，一种对匿名函数的一种简写方式

#### 函数形参的默认值

> es5 模拟默认参数

```
function sendAjax(url,timeout,callback){
    timeout = timeout || 2000;
    callback = callback || $.noop(); //默认参数
    
    $.ajax(url).done(function(){
        setTimeout(callback,timeout)
    })
    
}
```
> 上面的赋值操作会存在问题，你懂的，所以引入了es6的默认参数

```

function add(a=200,b=2){
    return a+b;
}

console.log(add()); //202
console.log(add(2)); //4


console.log(add(null,2)); //2  null是合法值 被当成0
console.log(add(undefined,2)); //202


```

#### 默认参数对arguments对象的影响

> 非严格模式下

```
function temp(first,second){
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
    first = 'c';
    second = 'd'
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
}

temp('a','b')


//true
//VM264:3 true
//VM264:6 true
//VM264:7 true


```

> 严格模式下

```
function temp(first,second){
    'use strict'
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
    first = 'c';
    second = 'd'
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
}

temp('a','b')


//true
//VM264:3 true
//VM264:6 false
//VM264:7 false

```

> 非严格模式下，参数与argument的值保持一致,严格模式下arguments与传进来的初始参数保持一致，看看es6默认值存在的话

> 非严格模式下


```
function temp(first,second='b'){
    console.log(arguments.length)
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
    first = 'c';
    second = 'b'
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
}

temp('a')

//1
//true
//VM264:3 false
//VM264:6 false
//VM264:7 false


```

> 严格模式下

```
function temp(first,second='b'){
    'use strict'
    console.log(arguments.length)
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
    first = 'c';
    second = 'd'
    console.log(first=== arguments[0]);
    console.log(second=== arguments[1]);
}

temp('a')

// Illegal 'use strict' directive in function with non-simple parameter list

//hhhhhhhhhhhh,不能用，尴尬

```


#### 默认参数表达式,可以传函数

```
function getValue(){
    return 5;
}

function add(first,second=getValue()){
    return first+second;
}


console.log(add(1,2)); //3
console.log(add(10));  //15

```

> 可以将先前定义好的形参当默认值

```

function add(first,second=first){
    return first+second;
}

console.log(add(1,2)); //3
console.log(add(10));  //20

反之不行哈

function add(first=second,second){
    return first+second;
}

console.log(add(1,2)); //3
console.log(add(undefined,10));  //second is not defined

//这就是所谓的临时死区TDZ，未初始化之前不可被引用

```

#### 不定参数 （...keys）

```
//模仿Underscore.js pick()方法

function pick(object,...keys){
    console.log(arguments.length); //3
    let result = Object.create(null);
    for(let i=0,len=keys.length;i<len;i++){
        result[keys[i]]= object[keys[i]]
    }
    
    return result;
    
}


let person = pick({name:'ly',age:'18',sex:'mael'},'age','sex'); 

console.log(person.name); //undefind
console.log(person.age); //18
console.log(person.sex); //mael
```

> 不定参数的要求

```
function pick(obj,...keys,last){} //报错，不定参数必须放在最后后面

//不定参数不能用于对象字面量setter之中

let object = {
    set name(...values){
        //执行逻辑
    }
}

```

#### Function 构造函数功能增强 可以使用默认参数和不定参数

```
const add = new Function('first','second = first','return first+second')

console.log(add(1,2),add(1))  //3 2


var pick = new Function("...args","return args[0]")

console.log(pick(1,2));  //1


```

#### 展开运算符

```
//之前求最大值的时候

let values = [25,100,75,56];

console.log(Math.max.apply(this,values));  //100

//有点麻烦，但是用展开运算符的话

console.log(Math.max(...values)); //100

//开不开心，我们可以拿其他值和数组值比较

console.log(Math.max(...values,200)); //200

```

#### 函数中可以获取函数名称的的属性 name

```
var func1 = function () {};
// ES5
func1.name // ""
// ES6
func1.name // "func1"
//上面代码中，变量func1等于一个匿名函数， ES5 和 ES6 的name属性返回的值不一样。
//如果将一个具名函数赋值给一个变量，则 ES5 和 ES6 的name属性都返回这个具名函数原本的名字。
const bar = function baz() {};
// ES5
bar.name // "baz"
// ES6
bar.name // "baz"
//Function构造函数返回的函数实例，name属性的值为 “anonymous” 。
(new Function).name // "anonymous"
//bind返回的函数，name属性值会加上 “bound ” 前缀。
function foo() {};
foo.bind({}).name // "bound foo"
(function(){}).bind({}).name // "bound "



//还有几个es6的情况

var dosomething = function(){}

console.log(dosomething.bind().name);  //bound dosomething
console.log((new Function()).name);    //anonymous

```

#### 明确函数的多重用途

> js函数有两种内部方式 [[Call]]和[[Construct]],当通过new关键字调用函数时，执行的是[[Construct]]函数,他负责创建一个通常被称作实例的新对象，然后再执行函数体,将this绑定到实例上;如果不同过new则执行[[Call]]函数,从而直接执行代码中的函数体


#### es5判断函数被调用的方法

```
function Person(name){
    if(this instanceof Person){
        this.name = name;
    } else{
        throw new Error('必须new才行，嘿嘿')
    }
}

var person = new Person("ly"); //
var notperson =Person("ll"); // 必须new才行，嘿嘿

//但是可以蒙混过关

var notperson =Person.call(peson,"ll"); //


```
#### new.target 精准判断

```
function Person(name){
    if(typeof new.target !== 'undefined'){
        this.name = name;
    } else{
        throw new Error('必须new才行，嘿嘿')
    }
}

var person = new Person("ly"); //
var notperson =Person.call(person,"ll"); //
```

#### 块级作用域

> 在es5的时代，当启用严格模式时，下列代码会报错,es6则不会,因为产生了块级作用域，该函数可以在这个if条件语句内部使用，外部依旧是undefined

```
 "use strict"
 if(true){
    console.log(typeof add); //function
    function add(a,b){
        return a+b;
    }
 }
 
 console.log(typeof add);  //undefined

```
> 但是在非严格模式下，该函数还是会被提升到全局作用域顶部

```
 if(true){
    console.log(typeof add); //function
    function add(a,b){
        return a+b;
    }
 }
 
 console.log(typeof add);  //function


```

### 重要改变 箭头函数

> 一些好玩的改变（兴奋状）

 - 没有this,spuer,arguments和new.target绑定
 - 不能通过new关键字调用
 - 没有原型
 - 不可以改变this的绑定
 - 不支持arguments对象
 - 不支持重复的命名参数

#### 箭头函数的语法

```
let add = (a,b) => a+b;

//实际类似于

let add = function(a,b){return a+b}


//当箭头函数只有一个参数时，不需要括号

let reflrct = value => value

//类似于

let reflrct = function(value){return value}

//不写参数时要加括号

let name = () => 'ly';


//类似于

let name = function(){return 'ly'}


//如果需要写复杂的函数体，则必须这样写

let getName = (fisrtName,secondName) => {
    return firstName+' '+ secondName;
}

//类似于

let getName = function(fisrtName,secondName){
    return firstName+' '+ secondName;
}

//如果想反回一个字面量对象则需要这样写

let person = () => ({
    name:'ly',
    age:18
})

//类似于

let person = function(){
    return {
    name:'ly',
    age:18
}
}

//创建一个立即表达函数

let person = ((name) => ({getName:() => name}))('ly')

//自己还原下看看，嘿嘿


```

#### 箭头函数没有this绑定

```
let PageHandler = {
     id:'13579',
     init:function(){
         document.addEventListener('click',function(event){
             this.doSomething(event.type)  //会报错
         })
     },
     doSomething:function(type){
         console.log(type);
     }
}

```

> es5的做法，将会这么做

```
let PageHandler = {
     id:'13579',
     init:function(){
         document.addEventListener('click',(function(event){
             this.doSomething(event.type)  
         }).bind(this))
     },
     doSomething:function(type){
         console.log(type);
     }
}



```

> 但是有了箭头函数的话，就帅多了

```
let PageHandler = {
     id:'13579',
     init:function(){
         document.addEventListener('click',event => this.doSomething(event.type) 
         )
     },
     doSomething:function(type){
         console.log(type);
     }
}
```

> 因为箭头函数是没有this的,所以在处理的过程中，它里面的this取决函数外部非箭头函数的this值


### 箭头函数不存在arguments绑定所以可以这么操作

```
 function outer(){
     return () => arguments[0];
 }
 
 let inner = outer(18)
 
  console.log(inner()); //18  就是这么骚气，直接访问箭头函数体外函数的arguments

```

> call(),bind(),apply() 都是可以用的，但是改变不了this的值的哈


#### 尾调用的优化(Tail Call)

> 尾调用指的是函数做为另一个函数最后一条语句被调用,它不会在调用栈上增加新的堆栈帧，而是直接更新调用栈，调用栈所占空间始终是常量，节省了内存，避免了爆栈的可能性,但是es5存在调用栈变得过大则会造成程序问题

> 尾调用实例

``` 

 function add(a,b){
     
 }
 
 function max(a,b,c,d){
 
    //......
     return add(a,c);
     
 }

```

> 优化需要满足以下条件,尾调用才不会创建新栈帧,而是清除并重用当前栈帧

 - 尾调用不访问当前栈的变量(不形成闭包)
 - 尾调用是函数内部的最后一句
 - 尾调用的结果将作为函数值返回 (必须有return fn())


> 使用场景 尾递归

> 错误方式

```
console.time('testForEach');
function factorial(n) {
    if(n<=1){
        return 1
    } else {
        return n*factorial(n-1)  //如果n很大，在不断递归的情况下，会栈溢出，这也不是尾递归
    }
}
var a =factorial(5000);
console.log(a); 
console.timeEnd('testForEach'); // 1.55322265625ms


```

> 正确写法

```
console.time('testForEach');
function factorial(n,p=1) {
    if(n<=1){
        return 1*p;
    } else {
        let result = p*n;
        return factorial(n-1,result)  
}
}
factorial(5000);
console.timeEnd('testForEach'); //0.492919921875ms    测 了10000 居然栈溢出  搞不懂

```
















































































