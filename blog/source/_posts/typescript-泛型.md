---
title: typescript-泛型
categories:
  - 技术
tags: typescript
date: 2018-06-13 14:48:21
---
![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言

> 泛型来创建可重用的组件，一个组件可以支持多种类型的数据

###泛型初探
> 没有泛型之前，我们需要传入的参数和返回的参数一致，我们可能会这样处理,但是最后导致输入输出并一定一致
``` ts
function indentify(arg:any) any{
     return arg
}
```
> 用泛型的话可以避免了，通T来捕获用户传的值类型，同时使用T作为类型返回，保证了一致性
``` ts
function indentify<T>(arg:T): T{
    return arg;
}
```
 - 第一种调用写法
>  let output = indentify<string>('ly') //传参必须是string类型
- 第二种调用写法
>  let output = identity("myString"); //传参必须是string类型

#### 泛型类型
> 泛型函数的类型与非泛型函数的类型没什么不同，只是有一个类型参数在最前面，像函数声明一样

``` ts

function identity<T>(arg: T): T {
  return arg;
}
//几种类型

//
let a1: <T>(arg: T)=> T = identity;

//我们也可以使用不同的泛型参数名，只要在数量上和使用方式上能对应上就可以。
let a2: <U>(arg: U) => U = identity;

// 我们还可以使用带有调用签名的对象字面量来定义泛型函数：

let myIdentity: {<T>(arg: T): T} = identity;

```
 - 定义一个泛型的接口

``` ts
interface IndentifyFn {
  <T>(arg: T): T;
}

function indentify<T>(arg: T):T{
    return arg;
}

let myIndentify: IndentifyFn = indentify;

```
 - 把泛型参数当作整个接口的一个参数

``` ts

interface IndentifyFn<T> {
  <T>(arg: T): T;
}

function indentify<T>(arg: T):T{
    return arg;
}

let myIndentify: IndentifyFn<number> = indentify;

```
<!-- more -->
### 泛型类
 - 泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。

``` ts
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };

```
> 类有两部分：静态部分和实例部分。 泛型类指的是实例部分的类型，所以类的静态属性不能使用这个泛型类型。

#### 泛型约束

```ts
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}
```
> 由于arg是泛型，类型有很多不确定性，上面的.length会报错，所以我们需要定义一个约束
``` ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}
```
> 泛型被约束了，现在只有存在length的属性才能被放进来

``` ts
loggingIdentity(3) //Argument of type '3' is not assignable to parameter of type 'Lengthwise'.

loggingIdentity('2323232') //ok

loggingIdentity([1,2,5,4,6])//ok

loggingIdentity({length: 10, value: 3}); //ok
```
#### 在泛型约束中使用类型参数

> 你可以声明一个类型参数，且它被另一个类型参数所约束,比如，现在我们想要用属性名从对象里获取这个属性。 并且我们想要确保这个属性存在于对象 obj上，因此我们需要在这两个类型之间使用约束

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); //Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```
#### 在泛型里使用类类型

> 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型

``` ts
function create<T>(c: {new(): T; }): T {
    return new c();
}

```

##### 高级例子

``` ts

class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!

```




 




