---
title: es6-类
date: 2018-03-17 
tags:es6
---

![timg.jpg](http://upload-images.jianshu.io/upload_images/10843623-71a29ec16eb69664.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 前言
> 最近这两天有点不在状态，感觉有种无形的压力压在身上，变的异常的暴躁了，唉，前端这条路真的走对了吗？算了，敲代码吧。

#### 类声明
> 要声明一个类,首先使用class关键字，紧接着是类的名字，然后其他内部方法和属性类似于对象的字面量写法 
```
 class PersonClass{
        //定义一个类似es5写法的构造函数，通过关键字constructor
            constructor(name){
                      this.name = name
            }
       //定义方法
          sayName(){
                  console.log(this.name);
}
}
let person = new PersonClass("ly");
person.sayName();
console.log(person instanceof PersonClass);
console.log(person instanceof Object);

console.log(typeof PersonClass);
console.log(typeof  PersonClass.prototype.sayName);
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-83d30f20fab6f12f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> es5对应的等价代码

```
let PersonType2 = (function(){
    "use strict"
    const PersonType2 = function(name){
        //确保通过关键字new调用该函数
        if(typeof new.target === "undefined"){
            throw new Error("必须通过new来创建")
        }
    }
    Object.defineProperty(PersonType2.prototype,'sayName',{
        value:function(){
            //确保不通过关键字new调用该函数
        if(typeof new.target !== "undefined"){
            throw new Error("不能通过new来创建")
        }
        console.log(this.name)
        },
        enumerable:false,
        writable:true,
        configurable:true
    })
    return PersonType2;
}())
```
#### 类表达式
> 跟函数一样他也存在表达式写法，好像还很雷同

```
 let PersonClass = class {
        //定义一个类似es5写法的构造函数，通过关键字constructor
            constructor(name){
                      this.name = name
            }
       //定义方法
          sayName(){
                  console.log(this.name);
}
}
let person = new PersonClass("ly");
person.sayName();
console.log(person instanceof PersonClass);
console.log(person instanceof Object);

console.log(typeof PersonClass);
console.log(typeof  PersonClass.prototype.sayName);
```
> 上述两种类的写法，它不会出现变量提升的现象，所以我们的那种写法，对结果没啥太大区别

#### 类也将作为一等公民
> 一等公民是指一个可以传入的函数，可以从函数返回，并且可以赋值给变量的值
```
//像这样的方式
function createObject(classDef){
      return new ClassDef();
}
let objClass = createObject(class {
      sayHi() {
      console.log('hi');
}
})

//函数表达式还有一种调用方式，就是通过立即调用类构造函数可以创建单例

let person = new class{
      constructor(name){
              this.name = name;  
      }
       sayName() {
        console.log(this.name);
}
}('ly')
person.sayName() //ly
```
### 访问器属性
> 类支持在构造函数下创建自己的属性，但是类也支持直接在原型上定义访问器的属性,通过get和set来获得值或者设置值
```
class Person {
    constructor(name) {
        this.name = name;
    }
    set ages(age) {
        return this.age = age;
    }
    get ages() {
        return this.age+10;
    }
}

let person = new Person('ly');

person.ages = 18
console.log(person.ages);
person.agess = 18
console.log(person.agess);

var descriptor = Object.getOwnPropertyDescriptor(Person.prototype,'ages');
console.log("get" in descriptor); //true
console.log("set" in descriptor);//true
console.log(descriptor.enumerable); //false

```
#### 生成器方法与类的结合
```
class MyClass {
    * createIterator() {
        yield 1;
        yield 2;
        yield 1;
    }
}
var b = new MyClass()
var a = b.createIterator();
console.log(a.next());
console.log(a.next());
console.log(a.next());
console.log(a.next());
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-bb30ba005f00fc95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 我们可以通过Symbol.iterator属性定义一个默认的类迭代器
```
class Collection {
    constructor() {
        this.items = []
    }
    *[Symbol.iterator]() {
        yield * this.items.entries();
    }
}
var collection = new Collection();

collection.items.push(1)
collection.items.push(12)
collection.items.push(16)

for (const x of collection) {
    console.log(x);
}
```
![a.png](http://upload-images.jianshu.io/upload_images/10843623-8e8e1426697003fe.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 静态成员
> es5来模拟静态成员

```
function PersonType(name){
    this.name = name;
    
}

//静态方法
PersonType.create = function(name){
    return new PersonType(name)
}

//实例方法
PersonType.prototype.sayName = function(){
    console.log(this.name);
}

var person = PersonType.create("ly");
person.name = "li"
console.log(person); //ly  （不是很懂静态成员是干嘛的，就是为了让构造函数也能像普通函数一样挂在函数吗？）
```
> 在es可以通过 static来创建静态成员
```
class PersonClass {
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log("hi")
    }

    static create(name){
        return new PersonClass(name)
    }
}

let person = PersonClass.create('ly');

console.log(person.name); //ly
```
### 继承与派生类

> 在es6之前继承需要这么长的代码，而且haibuyi
```
function Reactangle(length,width){
    this.length = length;
     this.width = width;
}

Reactangle.prototype.getArea = function(){
    return this.length*this.width;
}

function Square(length){
    Reactangle.call(this,length,length)
}

Square.prototype = Object.create(Reactangle.prototype,{
    constructor:{
        value:Square,
        enumerable:true,
        writeable:true,
        configurable:true
    }
})

var square = new Square(4);

console.log(square.getArea()); //16
console.log(square instanceof Square);//true
console.log(square instanceof Reactangle);//true
```


> 这样的类继承更加 清晰

```
class Reactangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        console.log(this.length,this.width);
    }
    getArea() {
        
        return this.length * this.width
    }
}
class Square extends Reactangle {
    constructor(length) {
        
        super(length, length)
    }
}

var square = new Square(3);

console.log(square.getArea()); //9
console.log(square instanceof Square); //true
```
> 这是super的默认是设置
```
class Squery extends Reactangle {

}

//等价于

class Square extends Reactangle {
    constructor(...args){
        super(...args);
    }
}
```
#### 类方法遮蔽
> 派生类中的方法总会覆盖基类中的同名方法。这种覆盖只是屏蔽

```
class Reactangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        console.log(this.length,this.width);
    }
    getArea() {
        
        return this.length * this.width
    }
}
class Square extends Reactangle {
     getArea() {
         return this.length*this.length;
     }
}
```
> 我们也可以屏蔽之后在调用
```
class Reactangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        console.log(this.length,this.width);
    }
    getArea() {
        return this.length * this.width
    }
}
class Square extends Reactangle {
     getArea() {
         return super.getArea();
     }
}

var square = new Square(3,3);

console.log(square.getArea()); //9
console.log(square instanceof Square); //true
```
### 静态成员继承
> 通过static创建的静态成员,静态变量不能被子类继承
```
class Reactangle {
    constructor(length, width) {
        this.length = length;
        this.width = width;
        console.log(this.length,this.width);
    }
    getArea() {
        
        return this.length * this.width
    }

    static create(length,width){
        return new Reactangle(length,width)
    }
}
class Square extends Reactangle {
     getArea() {
         return super.getArea();
     }
}

var square = Square.create(3,4);

console.log(square.getArea()); //9
console.log(square instanceof Square); //true
```
> 类相当于实例的原型， 所有在类中定义的方法， 都会被实例继承。 如果在一个方法前， 加上static关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用， 这就称为“ 静态方法”  (好像理解了点)

### 派生自表达式的类
> 只要一个函数具有[Constuctor]属性和原型
```
function Reactangle(length,length){
    this.length = length;
    this.width  = width;

}

Reactangle.prototype.getArea = function(){
    return this.length*this.width
}

class Square extends Reactangle {
     constructor (length) {
         super(length,length)
     }
}

var square = new Square(3);

console.log(square.getArea()); //9
console.log(square instanceof Square); //true

```
### 继承的高级用法
> 下面的栗子可以动态确定使用那个基类，更好的辅助开发
```
let SerializableMixin = {
    serialize(){
        return JSON.stringify(this)
    }
}

let AreaMixin = {
    getArea() {
        return this.length*this.width;
    }
}


function mixin(...mixins){
    var base = function(){};
    Object.assign(base.prototype,...mixins);
    return base;
}

class Square extends mixin (AreaMixin,SerializableMixin) {
      constructor (length){
          super();
          this.length = length;
          this.width = length;
      }
}

var x = new Square(3)
console.log(x.getArea())  //9
console.log(x.serialize()) //{"length":3,"width":3}

```
### 类的Symbol.species属性
>Symbol.species 是指定一个构造函数创建派生对象的函数值属性,比如当我们继承一个Array时，我们调用其方法产生的对象将不再是原始的类而是派生出来的类，比如
```
class MyArray extends Array {

}

let items = new MyArray(1,3,4,5),
    subitems = items.map(item => item*2);

console.log(items instanceof MyArray); //true
console.log(subitems instanceof MyArray); //true
console.log(items instanceof Array);  //true
console.log(subitems instanceof Array); //true
```
> 但是实际上也不是这么一回事，于是我加了这段代码
```
class MyArray extends Array {
    static get [Symbol.species](){
        return RegExp;
    }
}

let items = new MyArray(1,3,4,5),
    subitems = items.map(item => item*2);

console.log(items instanceof MyArray); //true
console.log(subitems instanceof MyArray); //false
console.log(items instanceof Array);  //true
console.log(subitems instanceof Array); //false

```
> mdn 的解释一下代码参考下

>  你可能想在扩展数组类 MyArray 上返回 Array 对象。 例如，当使用例如 map() 这样的方法返回默认的构造函数时，你希望这些方法能够返回父级的 Array 对象，以取代 MyArray 对象。Symbol.species 允许你这么做

```
class MyArray extends Array {
    // 覆盖 species 到父级的 Array 构造函数上
    static get [Symbol.species]() { return Array; }
  }
  var a = new MyArray(1,2,3);
  var mapped = a.map(x => x * x);
  
  console.log(mapped instanceof MyArray); // false
  console.log(mapped instanceof Array);   // true
```
> 但是即使不这么做我也是可以返回他的父级方法，有点鸡肋？ 再说

### 在累的构造函数使用new.target
> 之前在构造函数如果要求必须通过new来创建是这样写的
```

function Add(name){
    console.log(new.target=== Add) //true
    if(typeof new.target=="undefined"){
        throw new Error('必须通过new创建')
    }
    this.name = name;
}

var a = new Add('ly');
```

> 现在可以怎么写
```

class Add {
    constructor(name){
        this.name = name;
        console.log(new.target=== Add) //true
    }
}

var a = new Add('ly');
```
> 构造函数不通过new创建的实例，new.target为undefined
```
function Add(name){
    console.log(new.target) //true
    if(typeof new.target=="undefined"){
        throw new Error('必须通过new创建')
    }
    this.name = name;
}

var a =Add('ly');
```
> 类则是无论如何都有值，因为必须new啊 不然报错

> 我们可以用这样的方式定义基类，基类不可被创建，只能被继承
```
class Add {
    constructor(name){
        if(new.target===Add){
            throw new Error('基类不可被继承')
        }
        this.name = name;
    }
}
class SubAdd extends Add {
    constructor(name){
        super(name)
        
    }
}
// var a = new Add('ly'); //报错   基类不可被继承

var b= new SubAdd('hh')
```



























