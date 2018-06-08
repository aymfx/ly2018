---
title: jsTips-1
date: 2017-08-15 11:40:53
tags: tips
---

# 闭包

``` javascript

    var generateClosure = function() {
    var count = 0;
    var get = function() {
    count ++;
    return count;
    };
    return get;
    };
    var counter = generateClosure();
    console.log(counter()); // 输出 1
    console.log(counter()); // 输出 2
    console.log(counter()); // 输出 3


```
>这段代码中， generateClosure()  函数中有一个局部变量 count ，初值为 0。还有一
个叫做 get  的函数， get  将其父作用域，也就是  generateClosure() 函数中的  count 变量增加 1，并返回  count 的值。 generateClosure()  的返回值是  get 函数。在外部我们通过  counter 变量调用了  generateClosure()  函数并获取了它的返回值，也就是  get  函数，接下来反复调用几次 counter() ，我们发现每次返回的值都递增了 1。

>让我们看看上面的例子有什么特点，按照通常命令式编程思维的理解， count  是
generateClosure  函数内部的变量，它的生命周期就是 generateClosure  被调用的时
期，当  generateClosure 从调用栈中返回时， count  变量申请的空间也就被释放。问题是，在  generateClosure() 调用结束后， counter() 却引用了“已经释放了的” count
变量，而且非但没有出错，反而每次调用  counter()  时还修改并返回了 count 。这是怎么回事呢

>这正是所谓闭包的特性。当一个函数返回它内部定义的一个函数时，就产生了一个闭包，
闭包不但包括被返回的函数，还包括这个函数的定义环境。上面例子中，当函数
generateClosure()  的内部函数 get 被一个外部变量 counter 引用时， counter  和
generateClosure() 的局部变量就是一个闭包。如果还不够清晰，下面这个例子可以帮助
你理解：

```javascript

var generateClosure = function() {
var count = 0;
var get = function() {
count ++;
return count;
};
return get;
};
var counter1 = generateClosure();
var counter2 = generateClosure();
console.log(counter1()); // 输出 1
console.log(counter2()); // 输出 1
console.log(counter1()); // 输出 2
console.log(counter1()); // 输出 3
console.log(counter2()); // 输出 2

```

> 上面这个例子解释了闭包是如何产生的： counter1 和  counter2 分别调用了  generate-Closure()  函数，生成了两个闭包的实例，它们内部引用的  count  变量分别属于各自的运行环境。我们可以理解为，在 generateClosure() 返回 get  函数时，私下将  get 可能引用到的  generateClosure()  函数的内部变量（也就是  count  变量）也返回了，并在内存中生成了一个副本，之后 generateClosure()  返回的函数的两个实例 counter1和 counter2  就是相互独立的了。


# 理解  bind

```javascript
var someuser = {
name: 'byvoid',
func: function () {
console.log(this.name);
}
};
var foo = {
name: 'foobar'
};
func = someuser.func.bind(foo);
func(); // 输出 foobar
func2 = func.bind(someuser);
func2(); // 输出 foobar

```
>全局函数  func  通过 someuser.func.bind 将 this 指针绑定到了 foo ，调用 func() 输
出了 foobar 。我们试图将 func2 赋值为已绑定的 func 重新通过 bind 将 this 指针绑定到
someuser 的结果，而调用 func2 时却发现输出值仍为 foobar ，即  this 指针还是停留在 foo
对象上，这是为什么呢？要想解释这个现象，我们必须了解 bind  方法的原理

>gulp-smushit  压缩图片






