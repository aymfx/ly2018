---
title: typescript接口的使用
categories:
  - 技术
tags:
  - typescript
date: 2018-06-12
---

![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言
> TypeScript的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在TypeScript里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 接口如何工作

> 先看一个例子

``` typescript

function printLabel(labelledObj:{label:string}){
    console.log(labelledObj.label)
}

let myObj = {
    size:10,
    label:"Size 10 Object"
}

printLabel(myObj);

```
> 类型检查器会查看printLabel的调用。 printLabel有一个参数，并要求这个对象参数有一个名为label类型为string的属性。 需要注意的是，我们传入的对象参数实际上会包含很多属性，但是编译器只会检查那些必需的属性是否存在，并且其类型是否匹配

换一种方式写

``` typescript

interface labelledObjValue {
    label: string;
}


function printLabel(labelledObj){
    console.log(labelledObj.label)
}

let myObj = {
    size:10,
    label:"Size 10 Object"
}

printLabel(myObj);

```
> 类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以.

#### 可选属性

> 接口的属性不全都是必须的，只是在某些条件下存在，所以可以通过?符号来确定它是可选择的

``` typescript
interface SquareConfig {
    color?:string;
    width?:number;
}

function createSquare(config:SquareConfig):{
    color:string;
    area:number;
}{
  let newSquare = {color:'white',area:100};
  if(config.color){
    newSquare.color = config.color
  } 
  if(config.width){
    newSquare.area = config.width
  } 
  return newSquare;
}

let mysquare = createSquare({color:'blue'});

console.log(mysquare)
```
#### 只读属性 readonly

> 一些对象属性只能在对象刚刚创建的时候修改其值。

``` typescript
interface Point {
    readonly x:number;
    readonly y:number;
}

let p1: Point = {
    x:100,
    y:99
}

p1.x = 98; //无法分配到“x”，因为它是常数或只读属性

```
> TypeScript具有ReadonlyArray<T>类型，它与Array<T>相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改

``` typescript

let arr: number[]  = [1,3,5,4,6];

let ro : ReadonlyArray<number> = arr;

ro[0] = 55;  //类型“ReadonlyArray<number>”中的索引签名仅允许读取。

arr[0] = 55;

ro.push(6666) //类型“ReadonlyArray<number>”上不存在属性“push”。
 
ro.length = 100; //无法分配到“length”，因为它是常数或只读属性。

arr = ro; //不能将类型“ReadonlyArray<number>”分配给类型“number[]”。类型“ReadonlyArray<number>”中缺少属性“push”。

//可以通过 类型断言改变

arr = ro as number[]

```
> 做为变量使用的话用 const，若做为属性则使用readonly
<!-- more -->
#### 额外的属性检查

``` typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 }); //对象文字只能指定已知的属性，但“colour”中不存在类型“SquareConfig”。是否要写入 color?

```
>  对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

 - 通过类型断言我们可以绕过额外检查

> let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
 - 最佳的方式是能够添加一个字符串索引签名，前提是你能够确定这个对象可能具有某些做为特殊用途使用的额外属性

 ``` typescript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
 ```
 > 还有最后一种跳过这些检查的方式，这可能会让你感到惊讶，它就是将这个对象赋值给一个另一个变量： 因为 squareOptions不会经过额外属性检查，所以编译器不会报错

 ``` typescript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);

 ```
#### 函数类型

> 除了描述带有属性的普通对象外，接口也可以描述函数类型。

``` typescript
interface SearchFunc {
    (sourece:string,subString:string):boolean;
}

let mySearch: SearchFunc;
mySearch = function(src: string, subString: string) {
  let result = src.search(subString);
  return result > -1;
}

```
> 定义的函数可以省略 返回值类型，但是返回其他类型会报错

> 定义的函数可以不和接口相同

#### 可索引的类型
> 可索引类型具有一个 索引签名，它描述了对象索引的类型，还有相应的索引返回值类型。 

``` typescript

interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

```
> 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。 因为字符串索引声明了 obj.property和obj["property"]两种形式都可以。
``` typescript
interface NumberDictionary {
  [index: string]: number;
  length: number;    // 可以，length是number类型
  name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}

```

#### 类类型

> 与C#或Java里接口的基本作用一样，TypeScript也能够用它来明确的强制一个类去符合某种契约。

``` typescript
interface ClockInterface{
   currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime : Date;
    constructor(h:number,m:number){
      
    }
}
```

> 在接口里定义的东西，在类里面也必须定义，接口只是一个模子，但是里面的实现内容可以各有各的样

``` typescript
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock1 implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
      this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
class Clock2 implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
      this.currentTime = d;
      console.log('我可以打印东西')
  }
  constructor(h: number, m: number) { }
}

```
> 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

#### 类静态部分与实例部分的区别

> 当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内,因此，我们应该直接操作类的静态部分。

``` typescript
interface  ClockConstructor {
  new (hour:number,minute:number):ClockInterface;
}

interface ClockInterface {
  tick();
}

function createClock(ctor:ClockConstructor,hour:number,minute:number): ClockInterface {
  return new ctor(hour,minute)
}


class DigitalClock implements ClockInterface {
  constructor(h:number,m:number){}
  tick(){
    console.log(1122)
  }
}
class AnalogClock  implements ClockInterface {
  constructor(h:number,m:number){}
  tick(){
    console.log(1122)
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

#### 继承接口

> 类可以继承，接口也可以继承

``` typescript 
interface Shape{
  color:string;
}

interface Square extends Shape {
   sideLength:number
}


let Square = <Square> {};

Square.color = 'blue';
Square.sideLength = 10;

```

> 一个接口可以继承多个接口，创建出多个接口的合成接口。

``` typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```

#### 混合类型

> 接口能够描述JavaScript里丰富的类型。 因为JavaScript其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

``` typescript
interface Counter {
   (start:number):string;
   interval:number;
   reset():void;
}

function getCounter(): Counter {
    let counter = <Counter> function (start:number) {};
    counter.interval = 123;
    counter.reset = function(){}
    return counter;
}

let c = getCounter();

c(10);

c.reset();

c.interval = 5.0;

```

#### 接口继承类

> 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的private和protected成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（implement）。

``` typescript
 
class Control {
  private state:any;
}

interface SelectableControl extends Control {
    select():void;
}

class Button extends Control implements SelectableControl {
    select(){

    }
}

class TextBox extends Control {
  select() { }
}

// 错误：类“Image”错误实现接口“SelectableControl”。类型“Image”中缺少属性“state”。
class Image implements SelectableControl {
  select() { } //
}

class Location {

}

```
















































