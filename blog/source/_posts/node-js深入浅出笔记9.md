---
title: node.js深入浅出笔记9
date: 2017-09-06 09:43:10
tags: node
---

# 理解Buffer

> 这不是英雄联盟的buff,它是用于操作字节的，是个混血儿，是JavaScript与c++结合的模块，他是被放在全局对象上的

![流程图](https://aymfx.github.io/img/a20170906/a1.png)


## Buffer对象

> 它类似于数组，但它的元素是16进制的两位数。即0-255的数值

``` bash
//命令行敲的

> var str = "越努力，越幸运，ly"
undefined
> var buf = new Buffer(str,'utf-8')
undefined
> buf
<Buffer e8 b6 8a e5 8a aa e5 8a 9b ef bc 8c e8 b6 8a e5 b9 b8 e8 bf 90 ef bc 8c 6c 79>
> buf[10]
188
> buf[10]=10
10
> buf[10]
10
> buf[11]=-100
-100
> buf[11]
156
>

```

## Buffer内存的分配

> 在C++层面申请内存，在javascript中分配内存，node采用slab分配机制

> slab相当于申请好的固定大小的内存区块，它具有三种状态

 - full:完全分配状态
 - partial:部分分配状态
 - empty:没有分配状态

``` bash
 Buffer.poolSize = 8*1024;
```
>8kb的值技术每个slab的大小的值，在js层面，以它作为单位单元进行内存分配,node以8kb作为接线区分buffer是大对象还是小对象

>对于小于8kb的buffer来说，他可以被分配多个buffer对象。

>对于大于8kb的buffer来说，将会直接分配一个SlowBuffer对象作为slab对象，这个slab单元将会被这个大buffer对象独占

## Buffer 的转换

>Buffer对象可以与字符串之间相互转换

### 字符串转Buffer

``` bash
 new Buffer(str,[encoding]);

```

> 通过调用write()可以实现存储不同编码类型的字符串转码的值
``` bash
buf.write(string,[offset],[length],[encoding])
```

### Buffer 转字符串

``` bash
 buf.toString([encoding],[start],[end])

```
## Buffer的拼接
> 在Buffer传输场景中，它是一段一段的传输的

``` javascript

var fs = require('fs');

var rs = fs.createReadStream('a.txt');

var data = '';

rs.on('data',function(trunk){
    data +=trunk;
});

rs.on('end',function(){
    console.log(data);
})

```

> 这是有问题的，当我们在处理宽字符的问题,依然会出现乱码

``` javascript

var fs = require('fs');

var rs = fs.createReadStream('a.txt',{highWaterMark:11});

//{highWaterMark:11} 这个代表一次读取11字符，由于中文占三个，可能存在乱码

rs.setEncoding('utf-8');//这是是解决方法

var data = '';

rs.on('data',function(trunk){
    data +=trunk;
});

rs.on('end',function(){
    console.log(data);
})

```

> 对于以上的原因，是因为可读流内部设置了一个decoder对象，在每次data都通过该对象进行Bufffer到字符串的解码

``` javascript

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var buf1 = new Buffer(['0xe5','0xba','0x8a','0xe5','0x89','0x8d','0xe6','0x98','0x8e','0xe6','0x9c','0x88','0xe5','0x85']);

console.log(decoder.write(buf1));//床前明月



var buf2 = new Buffer(['0x89','0xef','0xbc','0x8c','0xe7','0x96','0x91','0xe4','0xbc','0xbc','0xe5','0x9c','0xb0','0xe4','0xb8','0x8a','0xe9','0x9c','0x9c']);

console.log(decoder.write(buf2));//光，疑似地上霜

```

>stringDecoder会保留未被处理的字符，于是就看不见乱码了，但还是会有些问题呀，处理的编码比较少

### 正确拼接Buffer

``` javascript

var chunks=[];
var size = 0;
res.on('data',function(chunk){
    chunks.push(chunks);
    size +=chunk.length;
});

res.on('end',function(){
    var buf = Buffer.concat(chunks,size);
    var str = iconv.decode(buf,'utf8');
    console.log(str);
})

```

>可以看下如何把小buffer拼接成大的buffer

``` javascript
Buffer.concat = function(list,length) {
    if(!Array.isArray(list)) {
        throw new Error('Usage:Buffer.concat(list,[length])')
    }
    if(list.length === 0){
        return new Buffer(0);
    }else if(listen.length ===1) {
        return list[0];
    }

    if(typeof length !='number'){
        length = 0;
        for(var i=0 ; i<list.length;i++){
            var buf = list[i];
            length +=buf.length;
        }
    }

    var buffer = new Buffer(length);
    var pos = 0;
    for(var i=0;i<list.length;i++){
        var buf = list[i];
        buf.copy(buffer,pos);
        pos +=buf.length;
    }
    return buffer;
}

```


## Buffer与性能









