![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言
>  TypeScript 是一种由微软开发的自由和开源的编程语言，它是JavaScript的一个超集，扩展了JavaScript的语法。
>TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。
TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译

> 目前我感觉主要是把弱类型语言变成强类型的，但是不是强制性的

### 安装 

> npm install -g typescript

> 文件后缀 .ts

> 运行编译命令 tsc index.js

###  基础类型
#### 布尔值 boolean
  - 类型 true 或者 false
> let isDone: boolean = false;
#### 数字 number
 - 类型 浮点数 支持十进制、二进制、十六进制、八进制

> let decLiteral: number = 6;

>let hexLiteral: number = 0xf00d;

>let binaryLiteral: number = 0b1010;

>let octalLiteral: number = 0o744;

#### 字符串
 - 可以使用单引号或者双引号 根据指定的书写规范来

> let name: string = "bob";      name = "smith";
 - 也可以使用字符串模板 ``

 ``` typescript
 let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${ name }.

I'll be ${ age + 1 } years old next month.`;

 ```

#### 数组
 - 第一种  元素类型后接[]来定义此类型的元素组成的数组

> let list: number[] = [1,2,3];

 - 第二种 使用数组的泛型

> let list: Array<number> = [1,2,3];

#### 元组 Tuple 
 - 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

``` typescript
let x: [string,number];

x = ['hello',10];
x = ['hello',10,120];  //报错 长度和类型错误
x = [,10,'hello'];  //报错 类型错误
```
 - 当访问索引值得时候，会得到正确的类型

``` typescript
let x: [string,number];

x = ['hello',10];

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number' does not have 'substr'
```
 - 当访问一个越界的元素，会使用联合类型替代：

 ``` typescript
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型

console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString

x[6] = true; // Error, 布尔不是(string | number)类型
 ```

 #### 枚举
> enum类型是对JavaScript标准数据类型的一个补充
 - 默认情况下 从零开始编号
``` typescript
enum Color {Red, Green, Blue};

let c: Color = Color.Green;

console.log(c) //1
```
 - 可以修改默认数值

``` typescript

enum Color {Red=1, Green, Blue};

let c: Color = Color.Green;

// 默认情况下 从零开始编号

console.log(c) //2

```
 - 我们也可以根据数值来查找名字

``` typescript
enum Color {Red=1, Green, Blue};

let name: string = Color[1]

// 默认情况下 从零开始编号

console.log(name) //Red

```

#### Any

> 当我们不清楚变量的类型的时候,这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用 any类型来标记这些变量

``` typescript
let notnumber: any = 4;

notnumber = '1212';

let differenType: any[] = [1,true,'hello'];

differenType[1] = 100

```
#### Void
>某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void

``` typescript
function warnUser(): void {
    alert("This is my warning message");
}
```
#### Null 和 Undefined

> TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和 void相似，它们的本身的类型用处不是很大

 - 默认情况下他们是所有类型的子类型

``` typescript
let num: number = 12;

num = 'asdad'; //fail 报类型不正确

num =null; //不会

num = undefined;

```
> 如果编译加了  tsc .\index.ts --strictNullchecks

> --strictNullchecks  那么他只能给void 和他们本身的类型赋值了

<!-- more -->

#### Never

> never类型表示的是那些永不存在的值的类型。 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 never类型，当它们被永不为真的类型保护所约束时

> never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使 any也不可以赋值给never
 
``` typescript
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

#### 类型断言

> 有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

> 通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

 - “尖括号”语法

``` typescript
let somevalues: any = 'i am a fe';

let strlength: number = (<string>somevalues).length;
```
 - as语法

 ``` typescript
let somevalues: any = 'i am a fe';

let strlength: number = (somevalues as string).length;
 ```








