![typescript](https://upload-images.jianshu.io/upload_images/10843623-d1427ac46b2dd12f.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言

> 类是es6的概念，在typescript也是存在的，本身typescript是为了方便后台开发者也能迅速入手js而设计的，现在我们来学习下类

#### 类
 - 简单的类
``` typescript
class Greeter {
   greeting:string;
   constructor(message:string){
     this.greeting = message;
   }
   greet(){
     return 'hello,'+this.greeting;
   } 
}

let greeter = new Greeter('world')

```
> 声明一个 Greeter类。这个类有3个成员：一个叫做 greeting的属性，一个构造函数和一个 greet方法

> 引用任何一个类成员的时候都用了 this。 它表示我们访问的是类的成员。

> 使用 new构造了 Greeter类的一个实例。 它会调用之前定义的构造函数，创建一个 Greeter类型的新对象，并执行构造函数初始化它。

#### 继承

> 继承和接口继承是一样的，通过继承来扩展基类

``` typescript
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();

```
> 类从基类中继承了属性和方法。 这里， Dog是一个 派生类，它派生自 Animal 基类，通过 extends关键字。 派生类通常被称作 子类，基类通常被称作 超类。

> 因为 Dog继承了 Animal的功能，因此我们可以创建一个 Dog的实例，它能够 bark()和 move()。

####  super()

``` typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);

```

> 派生类包含了一个构造函数，它 必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this的属性之前，我们 一定要调用 super()。 这个是TypeScript强制执行的一条重要规则。

> 这个例子演示了如何在子类里可以重写父类的方法。 Snake类和 Horse类都创建了 move方法，它们重写了从 Animal继承来的 move方法，使得 move方法根据不同的类而具有不同的功能。 注意，即使 tom被声明为 Animal类型，但因为它的值是 Horse，调用 tom.move(34)时，它会调用 Horse里重写的方法

#### 公共，私有与受保护的修饰符 默认 public
 - public 所有成员都可以访问
``` typescript

class Greeter {
  public greeting:string;
  public constructor(message:string){
     this.greeting = message;
   }
   public greet(){
     return 'hello,'+this.greeting;
   } 
}

let greeter = new Greeter('world');
console.log(greeter.greeting) // world

```
 - private 私有变量成员不能被访问 

``` typescript
class Greeter {
  private greeting:string;
  public constructor(message:string){
     this.greeting = message;
   }
   public greet(){
     return 'hello,'+this.greeting;
   } 
}

let greeter = new Greeter('world');
console.log(greeter.greeting) // 属性“greeting”为私有属性，只能在类“Greeter”中访问

```

> TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

> 当我们比较带有 private或 protected成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个 private成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。

``` typescript
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal {
    constructor() { super("Rhino"); }
}

class Employee {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

let animal = new Animal("Goat");
let rhino = new Rhino();
let employee = new Employee("Bob");

animal = rhino;
animal = employee; // 错误: Animal 与 Employee 不兼容.
```
> 这个例子中有 Animal和 Rhino两个类， Rhino是 Animal类的子类。 还有一个 Employee类，其类型看上去与 Animal是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 Animal和 Rhino共享了来自 Animal里的私有成员定义 private name: string，因此它们是兼容的。 然而 Employee却不是这样。当把 Employee赋值给 Animal的时候，得到一个错误，说它们的类型不兼容。 尽管 Employee里也有一个私有成员 name，但它明显不是 Animal里面定义的那个。

 - protected

> protected修饰符与 private修饰符的行为很相似，但有一点不同， protected成员在派生类中仍然可以访问

``` typescript
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误

```
> 构造函数也可以被派生，但是不能被实例化

``` typescript

class Person {
    protected name: string;
    protected constructor(theName: string) { this.name = theName; }
}

// Employee 能够继承 Person
class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
let john = new Person("John"); // 错误: 'Person' 的构造函数是被保护的.
```
 - readonly修饰符 

> 使用 readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。
 
``` typescript
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
console.log(dad.name) //Man with the 8 strong legs
dad.name = "Man with the 3-piece suit"; // 错误! name 是只读的.
```
<!-- more -->

#### 参数属性

 - 使用参数属性前

``` typescript
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

```
 - 使用后

``` typescript

class Animal {
    constructor(private name: string) { }
    move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
> 我们是如何舍弃了 theName，仅在构造函数里使用 private name: string参数来创建和初始化 name成员。 我们把声明和赋值合并至一处。

#### 存取器
> TypeScript支持通过getters/setters来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

 - 没有get和set时

``` typescript

class Employee {
    fullName: string;
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}

```

 - 有的情况

``` typescript

let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}

let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    alert(employee.fullName);
}

```
> 首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 其次，只带有 get不带有 set的存取器自动被推断为 readonly。 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

#### 静态属性

> 静态属性必须通过类名调用，相当实例属性上面的this

``` typescript

class Grid {
    static origin = {x: 0, y: 0};
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));

```

#### 抽象类
> 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。

``` typescript
abstract class Department {

  constructor(public name: string) {
  }

  printName(): void {
      console.log('Department name: ' + this.name);
  }

  abstract printMeeting(): void; // 必须在派生类中实现
}

class AccountingDepartment extends Department {

  constructor() {
      super('Accounting and Auditing'); // 在派生类的构造函数中必须调用 super()
  }

  printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
  }

  generateReports(): void {
      console.log('Generating accounting reports...');
  }
}

let department: Department; // 允许创建一个对抽象类型的引用
department = new Department(); // 错误: 不能创建一个抽象类的实例
department = new AccountingDepartment(); // 允许对一个抽象子类进行实例化和赋值
department.printName();
department.printMeeting();
department.generateReports(); // 错误: 方法在声明的抽象类中不存在
```
### 高级技巧

#### 构造函数

> 当创建了一个类时，其实声明了很多东西

 - 首先就是类的实例类型

``` typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter: Greeter;  //类型 为 Greeter
greeter = new Greeter("world");
console.log(greeter.greet());
```
 - 创建了构造函数，这个函数会在我们使用 new创建类实例的时候被调用,我们也可以认为类具有 实例部分与 静态部分这两个部分。

``` typescript
class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
      if (this.greeting) {
          return "Hello, " + this.greeting;
      }
      else {
          return Greeter.standardGreeting;
      }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet()); //Hello, there

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet()); //Hey there!
```
> 我们创建了一个叫做 greeterMaker的变量。 这个变量保存了这个类或者说保存了类构造函数。 然后我们使用 typeof Greeter，意思是取Greeter类的类型，而不是实例的类型。 或者更确切的说，"告诉我 Greeter标识符的类型"，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在 greeterMaker上使用 new，创建 Greeter的实例。

#### 把类当做接口使用

> 类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

``` typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```








