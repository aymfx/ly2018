---
title: es6-Set集合与Map集合
date: 2018-03-24
tags:es6
---

![2.jpg](http://upload-images.jianshu.io/upload_images/10843623-747213fe8846b569.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 前言

> 离回家的时间越来越近了，突然觉得自己很差劲，分享一首歌，道出心声啊

> 我的博客地址 ：http://www.aymfx.cn/

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=518904754&auto=1&height=66"></iframe>

```
大概过去的就真的已过去
偶尔想起还有几分怀念气息
遇上快乐遇上心酸遇上分离
生活终究得让人继续
衣身太长遮住大半个身体
学不会平淡幸福无从说起
可到最后 原谅背叛原谅任性
其实该原谅眼里的自己
那年的自己讨厌的自己如今的自己
风一直不停
乱了旅行 残喘下去
我除了祝福你没有其他目的
但却害怕往事再重提

大概过去的就真的已过去
偶尔想起还有几分怀念气息
遇上快乐遇上心酸遇上分离
生活终究得让人继续
衣身太长遮住大半个身体
学不会平淡幸福无从说起
可到最后 原谅背叛原谅任性
其实该原谅眼里的自己
那年的自己讨厌的自己如今的自己
风一直不停
乱了旅行 残喘下去
我除了祝福你没有其他目的
但却害怕往事再重提
我安慰我自己 恨自己 伤感记忆
只能用意志慢慢的去抚平冬季
我除了祝福你没有其他目的
我也可以带着青涩 美好回忆

```

### Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用

> 创建Set集合并添加元素,对于字符串和数字不会发生强制转换，因此时两个值

```

let set = new Set();

set.add(5)
set.add('5')

console.log(set.size) //2

```

> 对象如果做属性名的话，es5中会发生这种事

```
var set = Object.create(null);
var obj1 = {};
var obj2 = {};

set[obj1] = 'foo'

console.log(set[obj2])  //foo 因为不能识别对象他们全部转换成这个了 [object object]



let set = new Set(),
    key1 = {},
    key2 = {};

set.add(key1)
set.add(key2)

console.log(set.size) //2 说明不是调用tostring方法


```

> set是会忽略重复值的

```
let set = new Set();
set.add(5)
set.add(5)
set.add('5')
set.add(5)

console.log(set.size) //2

```


> 利用has() 检查值是否存在  清除所有元素 clear()

```
let set = new Set();
set.add('5')
set.add('6')
set.add('7')
console.log(set.has('5')) // true
console.log(set.has(5)) //false


set.clear();
console.log(set.has('6')) false

```

> 移除元素

```
let set = new Set();
set.add('5')
set.add('6')
console.log(set.has('5')) // true
set.delete('5') //false
console.log(set.has('5')) //false

```

> 使用Foreach循环,他和数组的方式的基本一样，我们来看看栗子，他们的不同

```
var arr = new Array(1,2,3,4),
    set = new Set([1,2,3,4]);

let pocess = {
    output (value,index) {
        console.log(value,index);
    },
    
    arrObj (arr) {
        arr.forEach((value,index,own) => {
            this.output(value,index);
            console.log(arr === own);
        },this)
    },
    
    setObj (arr) {
        arr.forEach((value,index,own) => {
            this.output(value,index);
            console.log(arr === own);
        },this)
    }
}

pocess.arrObj(arr)
pocess.setObj(set)

//第一种结果

VM163:0 1 0
VM163:12 true
VM163:6 2 1
VM163:12 true
VM163:6 3 2
VM163:12 true
VM163:6 4 3
VM163:12 true

//第二种结果

VM173: 12 1 1
VM173:19 true
VM173:6 2 2
VM173:19 true
VM173:6 3 3
VM173:19 true
VM173:6 4 4
VM173:19 true


```

> 将Set集合转换成数组，下列演示去重

```
//第一种方式

let set = new Set([1,5,58,6,7,8,9,5]),
    arr = [...set];
console.log(arr); //[1, 5, 58, 6, 7, 8, 9]

//第二种

console.log(Array.from(new Set([1,5,58,6,7,8,9,5]))); // [1, 5, 58, 6, 7, 8, 9]


```

#### Weak Set集合

> set 是一个强引用集合，不信看栗子

```
let set = new Set(),
    key = {};
    

    
set.add(key);
console.log(set.size); //1
//移除原始引用
key = null;

console.log(set.size); //1

//重新取回引用

key = [...set][0]; //{}

```

> 这种情况会造成内存的泄露，所以我们可以用以下的方法，弱引用的Set集合

#### 创建Weak Set集合

```
let set = new WeakSet(),
    key = {};

//向集合set添加对象
set.add(key);
console.log(set.has(key)); //true

set.delete(key)
console.log(set.has(key)); //false

```

> 我们试试这个

```
let set = new WeakSet(),
    key = {};
    

    
set.add(key);
console.log(set.has(key)); //true set.size不能用在weakset
//移除原始引用
key = null;

console.log(set.has(key)); //false


```

#### 两者的不同

> WeakSet 对象中只能存放对象引用, 不能存放值, 而 Set 对象都可以.

> WeakSet 对象中存储的对象值都是被弱引用的, 如果没有其他的变量或属性引用这个对象值, 则这个对象值会被当成垃圾回收掉. 正因为这样, WeakSet 对象是无法被枚举的, 没有办法拿到它包含的所有元素

> WeakSet 不可迭代 于是 for of foreach keys() values() 方法都没有


#### Map集合  Map 对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。


> 基本用法

```
let map = new Map(),
    key1 = {},
    key2 = {};

map.set('name','ly')
map.set(key1,"ly1")
map.set(key2,'2')

console.log(map.get('name'),map.get(key1),map.get(key2)); //ly ly1 2

```

> Map集合支持的方法

```
let map = new Map(),
    key1 = {},
    key2 = {};

map.set('name','ly')
map.set(key1,"ly1")
map.set(key2,'2')

console.log(map.size);  //3

console.log(map.has(key2)); //true
console.log(map.get(key2));2

map.delete(key2)
console.log(map.has(key2)); //false

map.clear()
console.log(map.has(key1)); //false
console.log(map.size);  //0


```

> Map集合的初始化方法,可以传一个数组，数组包含一个个子数组，子数组包含两个值，键和值


```
let map = new Map([["name",'ly'],["age",'18']]);

console.log(map.has('name')); //true
console.log(map.get('name')); //ly
console.log(map.size);  //2
```
> 可以使用ForEach()

```
let map = new Map([["name",'ly'],["age",'18']]);

map.forEach((value,key,own) => {
    console.log(value,key,own);
})

//ly name Map(2) {"name" => "ly", "age" => "18"}

18 age Map(2) {"name" => "ly", "age" => "18"}

```

### WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

> 适用场景 保存dom元素对象，便于销毁和创建

```
let map = new WeakMap(),
    ele = document.querySelector('div')[0];

map.set(ele,'Original');

let value = map.get('ele') 

console.log(value); //Original


ele.parentNode.removeChild(ele);

ele = null;

```

> WeakMap支持的方法

```
let key1 = {},
    key2 = {},
    map = new WeakMap([[key1,'ly'],[key2,'18']]);
    
    console.log(map.has(key1)); //true
    console.log(map.get(key1)); //ly
    map.delete(key1)
    console.log(map.has(key1)); //false
    console.log(map.get(key1)); //undefined

```

> 私有对象数据

> es5创建接近有私有数据的对象

```
var Person = (function(){
    var privateData = {},
        privateId = 0;
    function Person(name){
        Object.defineProperty(this,"_id",{value:privateId++})
        privateData[this._id] = {
            name:name
        }
    }
    
    Person.prototype.getName = function(){
        return privateData[this._id].name
    }
    
    return Person
}())

```

> 这种方式的弊端就是对象数据永远不会消失,而WeakUp可以处理这种情况

```
let Person = (function(){
    let privateData = new WeakMap();
    function Person(name){
        privateData.set(this,{name:name})
    }
    
    Person.prototype.getName = function(){
        return privateData.get(this).name
    }
    
    return Person
}())


```

 





