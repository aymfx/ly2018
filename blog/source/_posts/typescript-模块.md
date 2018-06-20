---
title: typescript-模块
categories:
  - 技术
tags: ts
date: 2018-06-15 12:01:05
---
 ![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言

> 模块在其自身的作用域里执行，而不是在全局作用域里；这意味着定义在一个模块里的变量，函数，类等等在模块外部是不可见的，除非你明确地使用export形式之一导出它们。 相反，如果想使用其它模块导出的变量，函数，类，接口等的时候，你必须要导入它们，可以使用 import形式之一。

> 模块是自声明的；两个模块之间的关系是通过在文件级别上使用imports和exports建立的。

> TypeScript与ECMAScript 2015一样，任何包含顶级import或者export的文件都被当成一个模块。相反地，如果一个文件不带有顶级的import或者export声明，那么它的内容被视为全局可见的（因此对模块也是可见的）。

### 导出
> 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出

```ts
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
```
> 导出重命名 用 as

```ts
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
```
> 重新导出

``` ts
export class ParseIntBasedZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && parseInt(s).toString() === s;
    }
}

// 导出原先的验证器但做了重命名,不会增加新的局部变量
export {ZipCodeValidator as RegExpBasedZipCodeValidator} from "./ZipCodeValidator";
```

> 或者一个模块可以包裹多个模块，并把他们导出的内容联合在一起通过语法：export * from "module"。

```ts
export * from "./StringValidator"; // exports interface StringValidator
export * from "./LettersOnlyValidator"; // exports class LettersOnlyValidator
export * from "./ZipCodeValidator";  // exports class ZipCodeValidator

```

#### 导入

> 导入一个模块中的某个导出内容

```ts

import { ZipCodeValidator } from "./ZipCodeValidator";

let myValidator = new ZipCodeValidator();

```
可以对导入内容重命名

``` ts
import { ZipCodeValidator as ZCV } from "./ZipCodeValidator";
let myValidator = new ZCV();
```
> 将整个模块导入到一个变量，并通过它来访问模块的导出部分

```ts
import * as validator from "./ZipCodeValidator";
let myValidator = new validator.ZipCodeValidator();

```
> 具有副作用的导入模块

尽管不推荐这么做，一些模块会设置一些全局状态供其它模块使用。 这些模块可能没有任何的导出或用户根本就不关注它的导出。 使用下面的方法来导入这类模块

```ts
import "./my-module.js";

```
#### 默认导出
> 每个模块都可以有一个default导出。 默认导出使用 default关键字标记；并且一个模块只能够有一个default导出。 需要使用一种特殊的导入形式来导入 default导出

```ts

//JQuery.d.ts

declare let $: JQuery;
export default $;

// App.ts

import $ from "JQuery";

$("button.continue").html( "Next Step..." );

```
> 导出静态类

```ts
//ZipCodeValidator.ts

export default class ZipCodeValidator {
    static numberRegexp = /^[0-9]+$/;
    isAcceptable(s: string) {
        return s.length === 5 && ZipCodeValidator.numberRegexp.test(s);
    }
}
//Test.ts
import validator from "./ZipCodeValidator";

let myValidator = new validator();

```
<!-- more -->
### export = 和 import = require()

> 用这种方式我们兼容传统的CommonJS和AMD的工作流模型

``` ts

//ZipCodeValidator.ts
let numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export = ZipCodeValidator;

//Test.ts
import zip = require("./ZipCodeValidator");

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new zip();

// Show whether each string passed each validator
strings.forEach(s => {
  console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
});
```
#### 生成模块代码

> 根据不同的规范生成不同的代码

> Node.js来说，使用--module commonjs； 对于Require.js来说，使用--module amd。比如：

> tsc --module commonjs Test.ts

#### 可选的模块加载和其它高级加载场景

> 有时候，你只想在某种条件下才加载某个模块。 在TypeScript里，使用下面的方式来实现它和其它的高级加载场景，我们可以直接调用模块加载器并且可以保证类型完全

> 编译器会检测是否每个模块都会在生成的JavaScript中用到。 如果一个模块标识符只在类型注解部分使用，并且完全没有在表达式中使用时，就不会生成 require这个模块的代码。 省略掉没有用到的引用对性能提升是很有益的，并同时提供了选择性加载模块的能力。

> 这种模式的核心是import id = require("...")语句可以让我们访问模块导出的类型。 模块加载器会被动态调用（通过 require），就像下面if代码块里那样。 它利用了省略引用的优化，所以模块只在被需要时加载。 为了让这个模块工作，一定要注意 import定义的标识符只能在表示类型处使用（不能在会转换成JavaScript的地方）

> 为了确保类型安全性，我们可以使用typeof关键字。 typeof关键字，当在表示类型的地方使用时，会得出一个类型值，这里就表示模块的类型

```ts
declare function require(moduleName: string): any;

import { ZipCodeValidator as Zip } from "./ZipCodeValidator";

if (needZipValidation) {
    let ZipCodeValidator: typeof Zip = require("./ZipCodeValidator");
    let validator = new ZipCodeValidator();
    if (validator.isAcceptable("...")) { /* ... */ }
}
```
> 模块里不要使用命名空间

