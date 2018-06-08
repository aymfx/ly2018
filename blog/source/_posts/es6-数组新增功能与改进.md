---
title: es6-数组新增功能与改进
date: 2018-03-15 20:59:40
tags: es6
---
### 数组
> es6加入了一些数组的新功能，以及改进了旧功能

#### 保证永远传的是数组的元素
```
let items = Array.of(20);
console.log(items.length) //1
console.log(items[0]) //20

itmes = Array.of(2);

console.log(itmes.length);//1
console.log(itmes[0]); //2


itmes = Array.of('2');

console.log(itmes.length); //1
console.log(itmes[0]); //'2'

```


#### 将类对象转换成数组的方式
```
function translate(){
    return Array.from(arguments)
}

let number = translate(1,3,4,5);
console.log(number); //[ 1, 3, 4, 5 ]
```
> 映射转换(第二个参数的转换)
```
function translate(){
    return Array.from(arguments,(value) => value+1)
}

let number = translate(1,3,4,5);
console.log(number); //[ 2, 4, 5, 6 ]
```
> 第三个值是this
```
let helper = {
    diff:1,
    add(value){
        return value+this.diff;
    }
}

function translate(){
    return Array.from(arguments,helper.add,helper)
}

let number = translate(1,3,4,5);
console.log(number); // [ 2, 4, 5, 6 ]
```
> Array.from可以用来转换可迭代对象
```
let number = {
    *[Symbol.iterator](){
        yield 1;
        yield 2;
        yield 3;
        yield 4;
    }
}

let number2 = Array.from(number,(value) => value+1);

console.log(number2); //[ 2, 3, 4, 5 ]
```
####  新增方法find()方法和findIndex()方法
> 两个方法的一个函数接受一个回调函数，以及一个this作为参数

> find返回的是return为true的值
```
let numbers = [1,34,4,44,33,56];
console.log(numbers.find((item,index,arr) => {
    if(item>33){
        console.log(item,index,arr);  //34 1 [ 1, 34, 4, 44, 33, 56 ]
        return item
    }
})) //34

```

> findIndex()返回的是满足true的值的位置(第一个)
```
let numbers = [1,34,4,44,33,56];
console.log(numbers.findIndex((item,index,arr) => {
    if(item>33){
        console.log(item,index,arr);  //34 1 [ 1, 34, 4, 44, 33, 56 ]
        return item
    }
})) //1
```

### fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
> 接受三个参数一个是要填充的值，一个是填充的起始位置，一个是结结束位置
```
let numbers = [1,34,4,44,33,56];
console.log(numbers.fill(1)) //[ 1, 1, 1, 1, 1, 1 ]
console.log(numbers) //[ 1, 1, 1, 1, 1, 1 ]  //改变原数组

let nums  = [2,3,4,5,2,4,3]

console.log(nums.fill(1,2)) //[ 2, 3, 1, 1, 1, 1, 1 ]

console.log(nums.fill(6,2,5)); //[ 2, 3, 6, 6, 6, 1, 1 ]  //作闭右开

```
### copyWith方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小
> 该方法接受3个值，一个是开始填充的位置，一个是开始复制的位置位置,改变原数组,一个是复制结束的位置

```
let numbers = [1,34,4,44,33,56];
console.log(numbers.copyWithin(2,3)); //[ 1, 34, 44, 33, 56, 56 ]
console.log(numbers.copyWithin(2,0,1)); //[ 1, 34, 1, 33, 56, 56 ]
```
### 定型数组
> 定型数组是一种用于处理数值类型(正如其名，不是所有类型)数据的专用数组，最早是在WebGL中使用的，WebGL是OpenGL ES 2.0的移植版，在Web 页面中通过 <canvas> 元素来呈现它。定型数组也被一同移植而来，其可为JS提供快速的按位运算

> 在JS中，数字是以64位浮点格式存储的，并按需转换为32位整数，所以算术运算非常慢，无法满足WebGL的需求。因此在ES6中引入定型数组来解决这个问题，并提供更高性能的算术运算。所谓定型数组，就是将任何数字转换为一个包含数字比特的数组，随后就可以通过我们熟悉的JS数组方法来进一步处理

#### 数组缓冲区
> ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区。ArrayBuffer 不能直接操作，而是要通过类型数组对象或 DataView 对象来操作，它们会将缓冲区中的数据表示为特定的格式，并通过这些格式来读写缓冲区的内容。
```
let buffer = new ArrayBuffer(10);
console.log(buffer.byteLength); //10

//也可以使用数组的方法（类似）
let buffer2 = buffer.slice(1,3);

console.log(buffer2.byteLength) //2

```
> 不能修改缓存区的大小，只能修改数据缓冲区内的数据

### 通过视图操作数组缓冲区
> 数组缓冲区是内存中的一段地址，视图是用来操作内存的接口。视图可以操作数组缓冲区或缓冲区字节的子集，并按照其中一种数值型数据类型来读取和写入数据。DataView类型是一种通用的数组缓冲区视图，其支持所有8种数值型数据类型
 - 有符号的8位整数(int8)
 - 无符号的8位整数(uint8)
 - 有符号的16位整数(int16)
 - 无符号的16位整数(uint16)
 - 有符号的32位整数(int32)
 - 无符号的32位整数(uint32)
 - 32位浮点数(float32)
 - 64位浮点数(float64)
> 可以通过以下几种只读属性来获取视图的信息
 - buffer 视图绑定的数组缓冲区
 - byteOffset DataView构造函数的第二个参数，默认是0，只有传入参数时才有值
 - byteLength DataView构造函数的第三个参数，默认是缓冲区的长度byteLength
```
let buffer = new ArrayBuffer(10),
//使用DataView创建视图的实例
    view1 = new DataView(buffer),
    view2 = new DataView(buffer,5,2);  // 第一个参数是创建的缓冲区，第二个是操作缓冲区的起始位置，第三个参数是缓冲区的长度

    console.log(view1.buffer === buffer); //true
    console.log(view2.buffer === buffer); //true

    console.log(view1.byteOffset); //0
    console.log(view2.byteOffset); //5

    
    console.log(view1.byteLength); //10
    console.log(view2.byteLength); //2
```
### 读取和写入数据
> js的8中数值型数据类型，在DataView的原型上都能找到
 - 读方法
DataView.prototype.getInt8()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个8-bit数(一个字节).
DataView.prototype.getUint8()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个8-bit数(无符号字节).
DataView.prototype.getInt16()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个16-bit数(短整型).
DataView.prototype.getUint16()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个16-bit数(无符号短整型).
DataView.prototype.getInt32()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个32-bit数(长整型).
DataView.prototype.getUint32()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个32-bit数(无符号长整型).
DataView.prototype.getFloat32()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个32-bit数(浮点型).
DataView.prototype.getFloat64()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处获取一个64-bit数(双精度浮点型).
 - 写方法
DataView.prototype.setInt8()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个8-bit数(一个字节).
DataView.prototype.setUint8()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个8-bit数(无符号字节).
DataView.prototype.setInt16()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个16-bit数(短整型).
DataView.prototype.setUint16()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个16-bit数(无符号短整型).
DataView.prototype.setInt32()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个32-bit数(长整型).
DataView.prototype.setUint32()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个32-bit数(无符号长整型).
DataView.prototype.setFloat32()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个32-bit数(浮点型).
DataView.prototype.setFloat64()
从DataView起始位置以byte为计数的指定偏移量(byteOffset)处储存一个64-bit数(双精度浮点型).
 - 用法
```
let buffer = new ArrayBuffer(10),
    //使用DataView创建视图的实例
    view = new DataView(buffer);

    view.setInt8(0,5);
    view.setInt8(1,-1);

    console.log(view.getInt8(0)); //5
    console.log(view.getInt8(1)); //-1

    //也可以用getInt16的字节调用，这样使用的话，两个8比特的字符就会合并成一个16bit字符,于是得到的值就是这个了
    console.log(view.getInt16()) //1535
```
 ### 定型数组—特殊的视图类型
> 上面的缓冲区类型视图是可以随意更变的，但是我们只希望处理一种数据类型，这让我们很容易选择和判断
```
let buffer = new ArrayBuffer(10),
//使用DataView创建视图的实例
    view1 = new Int8Array(buffer),
    view2 = new Int8Array(buffer,5,2);  // 第一个参数是创建的缓冲区，第二个是操作缓冲区的起始位置，第三个参数是缓冲区的长度

    console.log(view1.buffer === buffer); //true
    console.log(view2.buffer === buffer); //true

    console.log(view1.byteOffset); //0
    console.log(view2.byteOffset); //5

    
    console.log(view1.byteLength); //10
    console.log(view2.byteLength); //2
```
> 不用数组缓冲区创建数组，利用定型数组的创建
```
let ints = new Int16Array(2),
    floats = new Float32Array(5);

    console.log(ints.byteLength); //4
    console.log(ints.length); //2

    console.log(floats.byteLength); //20
    console.log(floats.length); //5

```
> 不给定型参数传值，则不能使用缓存区，因为它的容量默认为0

### 第三种创建定型数组的方法是调用构造函数时，将以下任一对象作为唯一的参数传入

　　1、一个定型数组

　　>该数组中的每个元素会作为新的元素被复制到新的定型数组中。例如，如果将一个int8数组传入到Int16Array构造函数中，int8的值会被复制到一个新的int16数组中，新的定型数组使用新的数组缓冲区

　　2、一个可迭代对象

　　> 对象的迭代器会被调用，通过检索所有条目来选取插入到定型数组的元素，如果所有元素都是不适用于该视图类型的无效类型，构造函数将会抛出一个错误

　 3、一个数组

　　　> 数组中的元素会被复制到一个新的定型数组中，如果所有元素都是不适用于该视图类型的无效类型，构造函数将会抛出一个错误

　　4、一个类数组对象

　　　> 与传入数组的行为一致

        ```
                let int1 = new Int16Array([15,25]),
        int2 = new Int32Array(int1);

    console.log(int1.buffer === int2.buffer); //4
    console.log(int1.byteLength);   //15
    console.log(int1[0])    //25
    console.log(int1[1])    //8
    console.log(int2.byteLength)    //2
    console.log(int2.length)    //15

    console.log(int2[0]);   //15
    console.log(int2[1]);   //25
        ```
  #### 元素大小
   > 每种定型数组由多个元素组成，元素大小,元素大小指的每个元素表示的字节数，该值存储在每个构造函数和每个实例的BYTES_PRE_ELEMENT属性
```
console.log(UInt8Array.BYTES_PRE_ELEMENT);
console.log(UInt16Array.BYTES_PRE_ELEMENT);

let ints = new Int8Array(5);
console.log(ints.BYTES_PER_ELEMENT);
    
```
> 定型数组也适用于数组的通用方法，但也有区别
```
//原型不同
let ints = new Int16Array([20,50]);
console.log(ints instanceof Array); //false
console.log(Array.isArray(ints));  //false
//行为差异，数组的元素尺寸大小一致,且不能被扩展
let ints = new Int16Array([25,50]);
console.log(ints.length); //2
console.log(ints[0]); //25
console.log(ints[1]); //50

ints[2] = 5; 

console.log(ints.length); //2
console.log(ints[0]); //25
//0被用于代替所有非法值
let ints = new Int16Array(['hi']);
console.log(ints.length); //1
console.log(ints[0]);   //0
```
### 缺失的方法
 - concat()
 - shift()
 - pop()
 - splice()
 - push()
 - unshift()
### 附加方法
 - set():将其他数组复制到已有的定型数组
 - subarray():提取已有定型数组的一部分作为新的定型数组

#### set() 一个是数组(定型数组或普通数组),一个是可选的偏移量，表示开始插入数据的位置，
```
let ints = new Int16Array(4);
ints.set([25,50]);
ints.set([125,50],1);
console.log(ints.toString()); //25,50,75,0
```

#### subArray()一个是可选的开始位置,一个是可选的结束
```
let ints = new Int16Array([25,50,75,100]),
    subint1 = ints.subarray(), 
    subint2 = ints.subarray(2), 
    subint3 = ints.subarray(1,3);

    console.log(subint1.toString());//25,50,75,100
    console.log(subint2.toString());//75,100
    console.log(subint3.toString());//75,100
```





























