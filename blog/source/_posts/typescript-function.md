---
title: typescript-function
categories:
  - 技术
tags:
  - typescript
date: 2018-06-12 18:03:11
---

![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言
> 函数是js的第一等公民，同样在typescript中，function也是不可缺少的存在

### 函数类型

#### 为函数定义类型
 
``` typescript
// 两种写法

function add(x:number, y:number): number {
   return x+y;
}

let myAdd = function(x:number, y:number): number {
  return x+y;
}
```
#### 书写完整的函数类型

``` typescript
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

//吓到我了 ，编译后就是这么点

var myAdd = function (x, y) { return x + y; };
```

> 只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。

``` typescript
let myAdd: (x: number, y: number) => number =
    function(x1: number, y2: number): number { return x + y; };

var myAdd = function (x, y) { return x + y; };
```

#### 推断类型 

> 上面写肯定很繁琐，于是可以通过编译器的推断来写，比如

``` typescript

// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return x + y; };

// The parameters `x` and `y` have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
//这叫做“按上下文归类”，是类型推论的一种。 它帮助我们更好地为程序指定类型。
```
#### 可选参数和默认参数

> 期望参数和实际传的参数必须一致

``` typescript
function buildName(firstName: string, lastName: string) {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // error, too few parameters
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");         // ah, just right
```
> 可以少传参数 用?实现

``` typescript
function buildName(firstName: string, lastName?: string) {
    if (lastName)
        return firstName + " " + lastName;
    else
        return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result3 = buildName("Bob", "Adams");  // ah, just right
```

<!-- more -->

> 当然我们也可设置默认参数

``` typescript
function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

let result1 = buildName("Bob");                  // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined);       // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
let result4 = buildName("Bob", "Adams");         // ah, just right
```
> 我们如何传多个参数呢，可通过扩展运算符来搞事情

``` typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

### this

#### this和箭头函数

``` js
let s = {
    name:'ly',
    getname:function(){
        console.log(this.name) //ly
        return function(){
            console.log(this.name)  //undefind
        }
    }
}

let s1 = s.getname();

s1() 
```

> 上面的例子表明this的指向在第二个的时候已经变成了window了,这样很容易造成困扰，于是箭头函数出来了，他可以指向上下文对象

``` ts
let s = {
  name:'ly',
  getname(){
      console.log(this.name)
      return ()=>{
          console.log(this.name) 
      }
  }
}

let s1 = s.getname();

s1()
```
<!-- more -->

> 然而在typescript里面this的类型确是any，我们需要修改成我们需要的类型

``` ts
interface p1 {
   name:string;
   age:number
}
interface person {
   name:string;
   age:number;
   getmessage(this:person):()=>p1;
}

let p2:person = {
    name:'ly',
    age:18,
    getmessage(this:person){
      return ()=>({
        name:this.name,
        age:this.age
      })
    }
}
```

#### 重载

> 对方法进行重载，根据参数选择使用哪个方法

``` ts
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

```
> 注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。v 

> 我的写法 上面有点难懂

``` ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function add(x:number):number;
function add(x:string):number;
function add(x:object):number;
function add(x):any{
    if(typeof x ==='object'){
      console.log(1)
    }
    if(typeof x ==='string'){
      console.log(2)
    }
    if(typeof x ==='number'){
      console.log(3)
    }
};

add(1);
add('false')
add({})
```
