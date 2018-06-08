---
title: node.js深入浅出笔记7
date: 2017-09-04 13:51:31
tags: node
---
# 内存的控制

>node毕竟是在v8上跑的服务，v8的内存管理机制，在浏览器使用起来绰绰有余，但是对于node确有限制，对内存的需求还是很大的，但是浏览器能分配的内存不是很大，所以还是有些局限性

## 查看node内存的信息

``` javascript

> process.memoryUsage();

{ rss: 21295104,
  heapTotal: 8425472,
  heapUsed: 3987064,
  external: 8942 }

  //heapTotal申请的总堆内存
  //heapUsed 当前使用量

```

## v8提供了调整内存大小的命令

``` javascript

    //两者选其一
    node --max-old-space-size=1700 test.js
    node --max-new-space-size=1024 test.js

```

## v8的垃圾回收机制

> v8的内存分代图

![流程图](https://aymfx.github.io/img/a20170904/a1.png)


>  node --max-old-space-size 用于设置老生带最大值

>   node --max-new-space-size用于设置新生代最大值

> 在不设置内存的情况默认 老生代默认64位约1400mb 32位约700mb

> 如图所示 源代码

![流程图](https://aymfx.github.io/img/a20170904/a2.png)

>对于新生代,它由两个 reserved_semispace_size所组成,一个reserved_semispace_size 的64位约16m，32位约8m。

> 下图就可以解释 v8堆内存在64位上有1464mb,在32位上有732mb

![流程图](https://aymfx.github.io/img/a20170904/a3.png)


> Scavenge算法

![流程图](https://aymfx.github.io/img/a20170904/a4.png)


> 当一个对象经过多次复制依然存活时，它将会被认为是生命周期较长的对象，这种较长生命周期的对象随后会被移动到老生代中，这种过程叫做晋升

![流程图](https://aymfx.github.io/img/a20170904/a5.png)

![流程图](https://aymfx.github.io/img/a20170904/a6.png)


> 老生代处理的算法  懵逼了 Mark-Sweep & Mark-Compact

 - 看看书，先带过

>用命令行查看垃圾回收日志

``` bash

node --trace_gc -e 'var a=[];for(var i=0;i<1000000;i++) a.push(new Array(100));' > gc.log

```

> 通过分析垃圾回收日志，可以了解垃圾回收的运行状况，找出那些阶段比较耗时 

> 使用--prof参数，可以分析v8执行的性能以及垃圾回收所占用的时间

``` javascript

//app.js
for(var i =0 ;i<1000000 ;i++){
    var a={};
}

```

``` bash

 node --prof app.js //运行

```

















