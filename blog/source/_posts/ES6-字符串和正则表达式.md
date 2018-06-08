---
title: ES6-字符串和正则表达式
date: 2018-01-25
tags: es6 
---


![timg.jpg](http://upload-images.jianshu.io/upload_images/10843623-c41e6ce3da1d0523.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 前言

> 入行这么久了，前端学习的成本感觉越来越高了，不会的东西一茬接一茬，在学校太忽视它，学的半吊子，现在要努力赶上才行，杭州的天气变冷了，我也想回家了，坚持，哎嘿，再上半个月班就要放假了开心。（这是从我自己博客移植过来的）

> 我的博客地址 ：http://www.aymfx.cn/，欢迎访问

### 引子

> 这张理解起来比较费劲，慢慢看，慢慢练,天气比较冷啊，手敲这些好费劲

### utf-16码位(基本多文种平面)到辅助平面字符的扩展

> 在ES6之前， JS 的字符串以 16 位字符编码(UTF-16)为基础。每个 16 位序列(相当于2个字节)是一个编码单元(code unit)，可简称为码元，用于表示一个字符。字符串所有的属性与方法(如length属性与charAt() 方法等)都是基于16位序列

> 最常用的Unicode字符使用16位序列编码字符，属于“基本多语种平面”(Basic Multilingual Plane BMP)，也称为“零断面”(plan 0)， 是Unicode中的一个编码区段，编码介于\u0000~\uFFFF之间。超过这个范围的码位则要归属于某个辅助平面或称为扩展平面(supplementary plane)，其中的码位仅用16位就无法表示了        为此，UTF-16引入了代理对(surrogate pairs)，规定用两个16位编码来表示一个码位。这意味着，字符串里的字符有两种：一种由一个码元（共 16 位）来表示BMP字符，另一种用两个码元（共 32 位）来表示辅助平面字符

```
let text = '?'

console.log(text.length); //2
console.log(/^.$/.test(text)); //false
console.log(text.charAt(0)); //�
console.log(text.charAt(1)); //�
console.log(text.charCodeAt(0)); //55362
console.log(text.charCodeAt(1)); //57271

```

> 这个字?（jí）其实就是一个两个16位字符组成的字,基于16位字符串的属性与方法便失效了


#### codePointAt()  只接受编码单元的位置而非字符位置作为参数,返回给定位置对应的码位

```
let text = 'a?'

console.log(text.charCodeAt(0)); //55362
console.log(text.charCodeAt(1)); //57271
console.log(text.charCodeAt(2)); //57271

console.log(text.codePointAt(0)); //134071
console.log(text.codePointAt(1)); //57271
console.log(text.codePointAt(2)); //57271

```

> 通过这个方法我们可以检测字符是不是32位的

```
function is32Bit(char){
    return char.codePointAt(0) > 0xffff;
    
}

console.log(is32Bit('?')); //ture
console.log(is32Bit('a'));  //false

```

#### String.fromCodePoint()通过码位获得对应字符

```
  console.log(String.fromCodePoint(134071)); //?
```

#### normalize()

> 许多欧洲语言有语调符号和重音符号。为了表示它们，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。
这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。

```
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2
'\u01D1'.normalize() === '\u004F\u030C'.normalize() // true

```
- NFC，默认参数，表示“标准等价合成”（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓“标准等价”指的是视觉和语义上的等价。
- NFD，表示“标准等价分解”（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- NFKC，表示“兼容等价合成”（Normalization Form Compatibility Composition），返回合成字符。所谓“兼容等价”指的是语义上存在等价，但视觉上不等价，比如“囍”和“喜喜”。（这只是用来举例，normalize方法不能识别中文。）
- NFKD，表示“兼容等价分解”（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符

#### 正则表达式u修饰符

```
let text = '?'
console.log(/^.$/.test(text)); //false
console.log(/^.$/u.test(text)); //true
```


#### 计算码位的数量

```
function codePointLength(text){
    let result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
}
console.log(codePointLength("123a")); //4
console.log(codePointLength("?a")); //2
console.log(codePointLength("?哦")); //2


//emmmmm。运行效率蛮低，听说有更简单的，后面演示

```

### 字符串中子串的识别

#### includes(x,y)检测指定字符串返回boolean值，第二参数是开始位置(0开始数)

```
let text = "adsdasdasgsgwefsfs";
let subtext = 'asd';
console.log(text.includes(subtext,4)) //true
console.log(text.includes(subtext)) //true
console.log(text.includes('sdadasda')) //false

```

#### startsWith(x,y) 和 endsWith(x,y) 检测字符串开头和结尾的是否与子串相匹配,第二参数是开始位置(0开始数)

```
let text = "adsdasdasgsgwefsfs";
let subtext1 = 'ads';
let subtext2 = 'sfs';

console.log(text.startsWith('asd',4)) //true
console.log(text.startsWith(subtext1)) //true
console.log(text.startsWith('sdadasda')) //false


console.log(text.endsWith('gsgwefsfs',18)) //true 以最后一个字母的位置为准
console.log(text.endsWith(subtext2)) //true
console.log(text.endsWith('sdadasda')) //false

```

#### repeat() 接受一个number,即将字符重复的次数

```
console.log('x'.repeat(6)); // xxxxxx
console.log('ly'.repeat(3));  //lylyly
console.log('爱'.repeat(2));  //爱爱

```

### 正则的语法变更 （蛮头疼的,正则还是晕乎乎的）


#### 正则表达式y修饰符

> 除了u 修饰符，ES6还为正则表达式添加了 y 修饰符，叫做“粘连”修饰符。y 修饰符的作用与 g 修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g 修饰符只要剩余位置中存在匹配就可，而 y 修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的含义，当为匹配到时，将会返回空，lastIndex将会置为0

```
var s = 'aaa_aa_a';  
var r1 = /a+/g;  
var r2 = /a+/y;  
  
console.log(r1.exec(s)) //["aaa", index: 0, input: "aaa_aa_a"] console.log(r2.exec(s)) //["aaa", index: 0, input: "aaa_aa_a"]
console.log(r1.lastIndex) //3
console.log(r2.lastIndex) //3


console.log(r1.exec(s)) //["aa", index: 4, input: "aaa_aa_a"]
console.log(r2.exec(s)) //null  
console.log(r1.lastIndex) //6
console.log(r2.lastIndex) //0



console.log(r1.exec(s)) //["a", index: 7, input: "aaa_aa_a"]
console.log(r2.exec(s)) //["aaa", index: 0, input: "aaa_aa_a"] console.log(r1.lastIndex) //8
console.log(r2.lastIndex) //3
```
> 检测y修饰符是否存在

```
let pattern = /hello\d/y;

console.log(pattern.sticky) //true  谷歌浏览器下
```

#### 正则表达式的复制

> es5 如下复制

```
var re1 = /ab/i
    re2 = new RegExp(re1);
    console.log(re1.construct === re2.construct) //true
```

> es6新增了可以添加传修饰符

```
var re1 = /ab/i
    re2 = new RegExp(re1,'g');
    console.log(re1.toString()) ///ab/i
    console.log(re2.toString()) ///ab/g

```

#### flags属性

> source获取正则表达式文本 flags获取其修饰符

```
let re = /ab/gi;


console.log(re.source); //ab
console.log(re.flags);  //gi

```

### 模板字面量

>JS 的字符串相对其他语言来说功能总是有限的，事实上，ES5中一直缺乏许多特性，如多行字符串、字符串格式化、HTML转义等。ES6通过模板字面量的方式进行了填补，模板字面量试着跳出JS已有的字符串体系，通过一些全新的方法来解决类似的问题


#### 反引号（``）

```
const name = 'ly';
let message = `${name},is a man`  //ly,is a man
console.log(message);

//${} 可以写变量  名叫字符串占位符

console.log(`\`hh\``); //`hh`

//es5 实现多行文本
var message = " ly  \n \
   love you"
console.log(message);

//es6

var message = ` ly
   love you`
console.log(message); // ly
                      // love you

```

#### 字符串占位符   ${javascript表达式}

```
let count = 15,
    price = .5,
    message = `${count} items cost $${(count*price).toFixed(1)}`;
    console.log(message); //15 items cost $7.5

```

#### 标签模板

>标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的是函数，紧跟在后面的模板字符串就是它的参数

```
var a = 5;
var b = 10;
tag `Hello ${a+b} world ${a*b}`;
//这个标识名tag,它是一个函数。整个表达式的返回值，就是tag函数处理模板字符串之后的返回值。函数tag会依次接收到多个参数。
```
> tag函数的第一个参数是一个数组，该数组的成员时模板字符串中那些没有变量替换的部分，也就是说，变量替换只发生在数组的第一个成员和第二个成员之间，以此类推。tag函数的其他参数都是模板字符串各个变量被替换后的值，由于本例中，模板字符串含有两个变量，因此tag会接收到value1和value2两个参数。
tag函数所有参数的实际值如下：
——第一个参数：['Hello ',' world ','']
——第二个参数：15
——第三个参数：50
也就是说tag函数实际上是以下面的形式调用的
tag(['Hello ',' world ',''],15,50);
我们可以按照需要编写tag 函数的代码。

```
var count = 5;
var price = 10;

function tag(s,v1,v2,v3){
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(s);
    console.log(v1);
    console.log(v2);
    return 'ok'
}
tag`q${count} items cost $${(count*price).toFixed(1)}.`;

//VM173:5 
//VM173:6  items cost $
//VM173:7  .
//VM173:8 5
//VM173:9 50.0
//ok

```

> 标签函数的常用形式

```
function tag(literals,...substitutions){
    //literals 值得是被${}隔开的字符
    //substitutions，有几个${}就有几个这个
}

```

> 利用 literals.length-1 === substitutions.length,拼接字符串

```
function passthru(literals,...values){
    var output ="";
    for(var index = 0;index<values.length;index++){
        output = literals[index]+values[index];
    }
    output+=literals[index];
    return output;
}

let count = 15,
    price = .5,
    message = passthru`${count} items cost $${(count*price).toFixed(1)}`;
    console.log(message); //15 items cost $7.5

```

> what?这样做的意义是啥？

> emmm,过滤html字符串,还有一些转义字符的过滤

```
function SaferHTML(templateData){
    var s = templateData[0];
    var i;
    for(i = 1;i<arguments.length;i++){
        var arg = String(arguments[i]);

        //sender里面可能有特殊字符，进行转义
        s += arg.replace(/&/g,"&amp;")
                .replace(/</g,"&lt;")
                .replace(/>/g,"&gt;");
        s += templateData[i];
    }
    console.log(i);//2，表示这个循环只执行了一次，因为templateData[0]="<p>",arguments这个数组只有${sender}这个元素，后面一长串字符都是templateData[2];
    return s;
}
var sender = '<script>alert("abc")</script>';
var message = SaferHTML`<p>${sender} has sent you a message.</p>`;
console.log(message);
```

#### 在模板字面量中使用原始值

> 使用内建对象String.raw访问

```

let ms1 = `ly\n love you`
let ms2 = String.raw`ly\n love you`

console.log(ms1); //ly
                  //love you

console.log(ms2); // ly\n love you


```










































