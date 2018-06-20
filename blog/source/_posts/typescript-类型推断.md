---
title: typescript-类型推断
categories:
  - 技术
tags: typescript
date: 2018-06-13 15:27:34
---

![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言
> 这节写的是类型是怎样被推断出来的

### 最佳通用类型

``` ts
let arr = [1,null,2,'string']; //let arr: (string | number)[]

```
> 对于未定义类型的数组，编译器会自动选择最佳通用类型 let arr: (string | number)[]

``` ts
interface tongyong {
    name:string;
    age:number;
}

interface Animal {
    [index: number]:tongyong
}

class Rhino implements tongyong{
     name = 'Rhino';
     age = 12;
}
class fish implements tongyong{
     name = 'fish';
     age = 12;
}
class jafish implements tongyong{
     name = 'jafish';
     age = 12;
}

let zoo = [new Rhino(), new fish(), new jafish()] //let zoo: (Rhino | fish | jafish)[]

```

> 上面的zoo最佳推断类型就是这个 let zoo: (Rhino | fish | jafish)[]，其实可以改下

``` ts

interface Animal {
    name:string;
    age:number;
}



class Rhino implements Animal{
     name = 'Rhino';
     age = 12;
}
class fish implements Animal{
     name = 'fish';
     age = 12;
}
class jafish implements Animal{
     name = 'jafish';
     age = 12;
}

let zoo:Animal[] = [new Rhino(), new fish(), new jafish()] //let zoo: (Rhino | fish | jafish)[]

```

#### 上下文类型

``` ts
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button);  //<- Error
};
```
>官网文档说这样写会报错，但是实际并没有，有点头晕，下面官方写法

``` ts
window.onmousedown = function(mouseEvent: any) {
    console.log(mouseEvent.button);  //<- Now, no error is given
};
//这个函数表达式有明确的参数类型注解，上下文类型被忽略
```

