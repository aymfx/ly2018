---
title: es6-Symbol
date: 2018-04-04 
tags:
---

### 前言

> 突然就断网了，hhhh

> 我的博客地址 ：http://www.aymfx.cn/

#### symbo

> 这是新的原始类型，一般是用于非字符串属性名称，利用其特性创建私有的变量

```
var firstname = Symbol(),
    person = {};
    
person[firstname] = "ly";

console.log(person[firstname]); //ly

```
> 添加描述

```
var firstname = Symbol('liuyang'),
    person = {};
    
person[firstname] = "ly";

console.log('liuyang' in person); //false
console.log(person[firstname]); //ly

console.log(firstname) //Symbol(liuyang)

```

> 可以通过typeof来识别

```
let symbol = Symbol("test");

console.log(typeof symbol)  //symbol

```

#### Symbol使用方式

> 可用于计算对象字面量属性名，Object.defineProperty()方法和Object.defineProperties()方法的调用过程中

```
let firstname = Symbol("first name")

//可用于计算对象字面量属性名

let person = {
    [firstname]:'nicholas'
}

//将属性设置为只读

Object.defineProperty(person,firstname,{writeable:false});

let lastName = Symbol('last name');

Object.defineProperties(person,{
    [lastName]:{
        value:'zhaosi',
        writeable:false
    }
})

console.log(person[firstname],person[lastName]);  //nicholas zhaosi

```


#### Symbol共享体系

> 当你的应用有两种不同的对象类型，但是你希望他们共享一个Symbol,你可以使用Symbol注册表，通过for方法来操作

```
let uid = Symbol.for('i am Object property');

let obj1 = {
    [uid] :'ly'
}

let uid2 = Symbol.for('i am Object property');

let obj2 = {
    [uid2] : 'i am Object property'
}

console.log(uid===uid2); true

console.log(obj1[uid],obj2[uid2]); ly i am Object property

console.log(uid2) Symbol(i am Object property)

//通过Symbol.keyFor(),来查找Symbol的键


console.log(Symbol.keyFor(uid),Symbol.keyFor(uid2))  //i am Object property i am Object property


let uid3 = Symbol('uid3')

console.log(Symbol.keyFor(uid3))  //undefined   ,因为没使用for方法进行注册

```

#### Symbol的类型强制转换

> 似乎Symbol不能与其他的类型发生强制转换的操作，我们只能用String惊醒字符串的输出

```
let uid = Symbol('useful message'),
    desc = String(uid);

console.log(desc); //Symbol(useful message)


//不能进行字符串的拼接
let uid = Symbol('useful message');

let string = uid+'!'  //报错  Cannot convert a Symbol value to a string


//不能进行运算

let uid = Symbol('useful message');

let string = uid/1; //Cannot convert a Symbol value to a number

//逻辑操作符可以,等价为布尔值true


let uid = Symbol('useful message');

let s = uid ? '对的': '错的';

console.log(s) //对的


```

#### Symbol的检索属性

> Object.keys()方法，将会返回的是可枚举的属性名,Object.getOwnPropertyNames()方法将会枚举的可举性，将会全部返回,但是他们不支持枚举Symbol属性,es6提供了Object.getOwnPropertySymbols()方法枚举包含的Symbol的自有属性数组

```
let uid = Symbol('a'),
    uid2 = Symbol('a2'),
    object = {
        [uid]:'12345',
        [uid2]:'35487',
        'hh':"我应该排除在外的"
    };

let symbols = Object.getOwnPropertySymbols(object);
 
console.log(symbols); // [Symbol(a), Symbol(a2)]
console.log(symbols[0]);// Symbol(a)
console.log(object[symbols[0]]);  //12345
 
```
#### 通过 well-known Symbol 暴露内部操作

> 除了自己创建的symbol，JavaScript还内建了一些在ECMAScript 5 之前没有暴露给开发者的symbol，它们代表了内部语言行为。它们可以使用以下属性访问：


#### 迭代 symbols


 - Symbol.iterator

> 一个返回一个对象默认迭代器的方法。使用 for...of。


- Symbol.asyncIterator 

> 一个返回对象默认的异步迭代器的方法。使用 for await of。


#### 正则表达式 symbols

 - Symbol.match

> 一个用于对字符串进行匹配的方法，也用于确定一个对象是否可以作为正则表达式使用。使用 String.prototype.match().

 - Symbol.replace

> 一个替换匹配字符串的子串的方法. 使用 String.prototype.replace().

 - Symbol.search

> 一个返回一个字符串中与正则表达式相匹配的索引的方法。使用String.prototype.search().

 - Symbol.split

> 一个在匹配正则表达式的索引处拆分一个字符串的方法.。使用 String.prototype.split().

#### 其他 symbols

 - Symbol.hasInstance

> 一个确定一个构造器对象识别的对象是否为它的实例的方法。使用 
instanceof.

 - Symbol.isConcatSpreadable

> 一个布尔值，表明一个对象是否应该flattened为它的数组元素。使用Array.prototype.concat().

 - Symbol.unscopables

> 拥有和继承属性名的一个对象的值被排除在与环境绑定的相关对象外。

 - Symbol.species

> 一个用于创建派生对象的构造器函数。

 - Symbol.toPrimitive

> 一个将对象转化为基本数据类型的方法。

> Symbol.toStringTag

 - 用于对象的默认描述的字符串值。使用Object.prototype.toString().

#### Symbol.hasInstance方法

> 一个确定一个构造器对象识别的对象是否为它的实例的方法

```
obj = new Array();

console.log(obj instanceof Array); //true


console.log(Array[Symbol.hasInstance](obj)) //VM187:5 true

```
> 我可以用它定义一个无实例的函数

```
function myObject (){
    
}

Object.defineProperty(myObject,Symbol.hasInstance,{
    value:function(v){
        return false
    }
})


let obj = new myObject();

console.log(obj instanceof myObject); //false


```

> 我们可以定制自己的实例，通过这种方式，可以修改内建对象但是尽量不要这么做，应该修改自己创建的构造函数

#### Symbol.isConcatSpreadable属性

> Symbol.isConcatSpreadable属性是一个布尔值，如果属性为true，则表示对象有length属性和数字键,这样它就可以使用数组的concat()方法了

```
let obj = {
    0:'a',
    1:'b',
    length:2,
    [Symbol.isConcatSpreadable]:true
}

let obj2 = {
    1:'a',
    s:'b',
    length:2,
    [Symbol.isConcatSpreadable]:true
}


let message = ['hi'].concat(obj);

console.log(message);

let message2 = ['hi'].concat(obj2);

console.log(message2);

```
![1.png](http://upload-images.jianshu.io/upload_images/10843623-a176dfab66efd797.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


> 说明他会寻找数字下标，找不到就设置为空，并且从零开始

#### Symbol.match,Symbol.replace,Symbol.search,Symbol.split

 - match()

> match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。

 - replace()

>  replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。

 - split()

> 用于把一个字符串分割成字符串数组

 - search()

> 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。

> 以上方法时es5d的正则表达式的字符串匹配，但是无法使用自定义的对象来替代正则表达式进行正则匹配，es6这些方法就可以这么操作，我们来看他们的定义

 - Symbol.match 接受一个字符串的参数，如果匹配成功则返回匹配成功的数组，否则返回null
 - Symbol.replace 接受一个字符串类型的参数和一个替换字符串，最终返回一个字符串
 - Symbol.search 接受一个字符串参数，如果匹配到内容，就返回数组的位置，否则返回-1
 - Symbol.split 接受一个字符串参数，根据内容匹配将字符串分解，并将返回分解后的数组

> 看看栗子

```
let hasLengthOf10 = {
    [Symbol.match]:function(value) {
        return value.length === 10 ? [value]:null
    },
    [Symbol.replace]:function(value, replace) {
        return value.length === 10 ? replace:value
    },
    [Symbol.search]:function(value) {
        return value.length === 10 ? 0:-1
    },
    [Symbol.split]:function(value) {
        return value.length === 10 ? [ , ]:[value]
    }
}

let m1 = 'Hello world' //11
let m2 = 'Hello john'  //10
 
console.log(m1.replace(hasLengthOf10)); //[empty]
console.log(m2.replace(hasLengthOf10)); //undefined

console.log(m1.match(hasLengthOf10));//null
console.log(m2.match(hasLengthOf10));//["Hello john"]

console.log(m1.search(hasLengthOf10)); //-1
console.log(m2.search(hasLengthOf10)); //0


console.log(m1.split(hasLengthOf10));["Hello world"]
console.log(m2.split(hasLengthOf10)); //[empty]

```

#### Symbol.toPrimitive 指将被调用的指定函数值的属性转换为相对应的原始值

> 在 Symbol.toPrimitive 属性(用作函数值)的帮助下，一个对象可被转换为原始值。该函数由字符串参数 hint 调用，目的是指定原始值转换结果的首选类型。 hint 参数可以是"number"、"string" 和 "default" 中的一种。

```
//话不多说看栗子

function Temp(degress){
    this.degress = degress
}


Temp.prototype[Symbol.toPrimitive] = function(hint){
    switch(hint){
        case "string":
            return this.degress +"\u00b0";  //degress symbol
        
        case "number":
            return this.degress;
        case "default" :
            return this.degress+'ly'
    }
}

var t = new Temp(8);

console.log(t+'5555') //8ly5555
console.log(t/'2') //4
console.log(String(t)) //8°

```

#### Symbol.toStringTag

> Symbol.toStringTag 是一个内置 symbol，它通常作为对象的属性键使用，对应的属性值应该为字符串类型，这个字符串用来表示该对象的自定义类型标签，通常只有内置的 Object.prototype.toString() 方法会去读取这个标签并把它包含在自己的返回值里。

> 我们识别数组还是对象，一般习惯用 toString方法来实现，例如

```
function isArray(arr){
    return Object.prototype.toString.call(arr) === '[object Array]'
}

```

> 现在我们可以重写一个对象的类型

```
function Person(name){
    this.name =name;
}

Person.prototype[Symbol.toStringTag] = 'Person';

let people = new Person('ly');

console.log(Object.prototype.toString.call(people)); //[object Person]

```
#### Symbol.unscopables 指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。

> 可以在任何对象上定义 @@unscopables symbol (Symbol.unscopables)，用于排除属性名称并与 with 环境绑定在一起作为词法变量公开。 请注意，如果使用 Strict mode，语句将不可用，并且可能也不需要 symbol。

> 在 unscopables 对象上设置属性为 true，将使其 unscopable 并且因此该属性也将不会在词法环境变量中出现。 如果设置属性为 false ，则将使其可 scopable 并且该属性会出现在词法环境变量中。

```
我们在使用with时，如果用了对象属性作为变量则会报错，例如(es6数组存在values方法)

let values = [1,2],colors=['w', 'y', 'k', 'o', 'p'],color='blue';

console.log(colors.values()); 

with(colors){
    push(color)
    push(...values)
    console.log(values);
}

console.log(colors); //["red", "blue", 1, 2]  //emmmm,没报错的原因values()方法还没加上去

//报错了就用这种方式,他是将词法排除在这个with环境中

Array.prototype[Symbol.unscopables] = Object.assign(Object.create(null),{
 copyWith:true,
 entries:true,
 fill:true,
 find:true,
 findIndex:true,
 keys:true,
 values:'true'
    
})


```
![2.png](http://upload-images.jianshu.io/upload_images/10843623-2c5109c4f8e58e1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


















