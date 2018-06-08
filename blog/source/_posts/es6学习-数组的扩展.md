---
title: es6学习--数组的扩展
date: 2016-11-10
tags: es6
---
# Array.from()
	Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）。
		必须具有length属性
```
	let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
```
	常见的类似数组的对象是DOM操作返回的NodeList集合，以及函数内部的arguments对象。Array.from都可以将它们转为真正的数组。
```
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}
```
	只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组。
	

```
Array.from('hello')
	// ['h', 'e', 'l', 'l', 'o']
	
	let namesSet = new Set(['a', 'b'])
	Array.from(namesSet) // ['a', 'b']
```
	扩展运算符（...）也可以将某些数据结构转为数组。
```
// arguments对象
function foo() {
  var args = [...arguments];
}

// NodeList对象
[...document.querySelectorAll('div')]

Array.from({ length: 3 });
// [ undefined, undefined, undefined ]
```
	Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```
Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x)
// [1, 4, 9]
```

#Array.of()
	Array.of方法用于将一组值，转换为数组。
```
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

```
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```
	Array.of方法可以用下面的代码模拟实现。
```
function ArrayOf(){
  return [].slice.call(arguments);
}
```

# 数组实例的copyWithin()
	数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
```
	Array.prototype.copyWithin(target, start = 0, end = this.length)
	它接受三个参数。
				target（必需）：从该位置开始替换数据。
				start（可选）：从该位置开始读取数据，默认为0。如果为负值，表示倒数。
				end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
```

```
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]
```

```
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

```
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
var i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署TypedArray的copyWithin方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]
```

# 数组实例的find()和findIndex()
	数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined
	

```
[1, 4, -5, 10].find((n) => n < 0)//-5
```
	find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。
	findIndex方法的用法与find方法非常类似返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
```
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

```
[NaN].indexOf(NaN)
// -1

[NaN].findIndex(y => Object.is(NaN, y))
// 0
```
# 数组实例的fill()
	fill方法使用给定值，填充一个数组。
	

```
['a', 'b', 'c'].fill(7)
	// [7, 7, 7]
	
	new Array(3).fill(7)
	// [7, 7, 7]
```


# 数组实例的entries()，keys()和values()
 		ES6提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

```
let letter = ['a', 'b', 'c'];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

# 数组实例的includes()
	Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。该方法属于ES7，但Babel转码器已经支持。
```
	[1, 2, 3].includes(2);     // true
	[1, 2, 3].includes(4);     // false
	[1, 2, NaN].includes(NaN); // true
```
	indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相当运算符（===）进行判断，这会导致对NaN的误判。

# 数组的空位
	数组的空位指，数组的某一个位置没有任何值。比如，Array构造函数返回的数组都是空位
```
// forEach方法
[,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
['a',,'b'].filter(x => true) // ['a','b']

// every方法
[,'a'].every(x => x==='a') // true

// some方法
[,'a'].some(x => x !== 'a') // false

// map方法
[,'a'].map(x => 1) // [,1]

// join方法
[,'a',undefined,null].join('#') // "#a##"

// toString方法
[,'a',undefined,null].toString() // ",a,,"
```

```
forEach(), filter(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
```

	Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位
```
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
```
	扩展运算符（...）也会将空位转为undefined。
```
[...['a',,'b']]
// [ "a", undefined, "b" ]
```
	copyWithin()会连空位一起拷贝。
```
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
```
	fill()会将空位视为正常的数组位置。
```
new Array(3).fill('a') // ["a","a","a"]
```
	for...of循环也会遍历空位。
```
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
```
	entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

```
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```
