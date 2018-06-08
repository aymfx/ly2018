---
title: es6学习--字符串的扩展
date: 2016-11-10
tags: es6
---

# 数组的解构赋值
		ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。
		这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值
``` bash
	es5写法
	let a = 1;
	let b = 2;
	let c = 3;
```

``` bash
es6写法
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined //解构不成功，变量的值就等于undefined
z // []
```
	不完全解构：即等号左边的模式，只匹配一部分的等号右边的数组
``` bash
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4
```
	解构的大前提在于必须具备 Iterator 接口

	默认值:解构赋值允许指定默认值
``` bash
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
//ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null];
x // null
```


# 对象的解构赋值
	对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
``` bash
let { foo, bar } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```
	变量名与属性名不一致，必须写成下面这样
``` bash
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
let { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
//foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。
```
	采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。
``` bash
let foo;
let {foo} = {foo: 1}; // SyntaxError: Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1}; // SyntaxError: Duplicate declaration "baz"
//let命令下面一行的圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句。
let foo;
({foo} = {foo: 1}); // 成功

let baz;
({bar: baz} = {bar: 1}); // 成功
```
	对象的解构也可以指定默认值。对象的属性值严格等于undefined
``` bash
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x:y = 3} = {};
y // 3

var {x:y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"
```
	可以对现有对象赋值
	

``` bash
let { log, sin, cos } = Math;
//Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。
```
	数组本质是特殊的对象，因此可以对数组进行对象属性的解构
```
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3
```

# 字符串的解构赋值
	字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
``` bash
	const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```
	类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
``` bash
	let {length : len} = 'hello';
len // 5
```

# 数值和布尔值的解构赋值
	解构赋值时，如果等号右边是数值和布尔值，则会先转为对象
``` bash
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```
	只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
	

``` bash
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError
```
# 函数参数的解构赋值
	函数的参数也可以使用解构赋值
``` bash
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]
```
	函数参数的解构也可以使用默认值
``` bash
function move({x = 0, y = 0} = {}) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

写法不同，结果不一样
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
```

# 圆括号问题
		解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。
		 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。
		但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。
	
	变量声明语句中，不能带有圆括号。
``` bash
	// 全部报错:因为它们都是变量声明语句，模式不能使用圆括号
let [(a)] = [1];

let {x: (c)} = {};
let ({x: c}) = {};
let {(x: c)} = {};
let {(x): c} = {};

let { o: ({ p: p }) } = { o: { p: 2 } };
```
	函数参数中，模式不能带有圆括号,函数参数也属于变量声明
``` bash
// 报错
function f([(z)]) { return z; }
```
	赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。
	

``` 
// 全部报错
	({ p: a }) = { p: 42 };
	([a]) = [5];
	[({ p: a }), { x: c }] = [{}, {}];
```
	可以使用圆括号的情况

``` bash
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
//上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。
```

# 用途
	（1）交换变量的值
``` bash
let x = 1;
let y = 2;

[x, y] = [y, x];
```
	（2）从函数返回多个值：函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回。有了解构赋值，取出这些值就非常方便
``` bash
// 返回一个数组

function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```
	（3）函数参数的定义:解构赋值可以方便地将一组参数与变量名对应起来。

``` bash
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```
	（4）提取JSON数据：解构赋值对提取JSON对象中的数据，尤其有用
	

``` bash
let jsonData = {
	  id: 42,
	  status: "OK",
	  data: [867, 5309]
	};
	
	let { id, status, data: number } = jsonData;
	
	console.log(id, status, number);
	// 42, "OK", [867, 5309]
```
	
	（5）函数参数的默认值

``` bash
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
//指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句
```
	（6）遍历Map结构：任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。
``` bash
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

