---
title: react-Components and Props
date: 2017-07-03
tags: react
---
# 定义组件 Functional and Class Components

> 组件类似于一个函数，可以是function 也可以是class 他们返回的结果是一个组件（jsx）

> 第一种写法


```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

> 第二种写法


```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
# 渲染组件

> 通过ReactDOM.render()方法进行渲染 Rendering a Component,


```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
>  <div/>只是一个普通的dom元素，但是<Welcome/>这是一个具有自己作用域的组件

# 组件使用 

> 组件之间是可以重复使用的，看下面这个例子 Composing Components


```
function formatDate() {
    return Date.now()+Math.random();
}

function DateNow(props) {
     return (
         <div>
             <h1>Hello1,{props.date}</h1>
         </div>
     )
}


class App extends Component {

  render() {
    return (
      <div className="App">
          <DateNow date={formatDate()}/>
          <DateNow date={formatDate()}/>
          <DateNow date={formatDate()}/>
      </div>
    );
  }
}

function tick() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

setInterval(tick,1000)
```

> 组件与组件之间的提取与嵌套 Extracting Components


```
//渲染页面
function formatDate() {
    return Date.now()+Math.random();
}

function DateNow(props) {
     return (
         <div>
             <h1>Hello1,{props.date}</h1>
         </div>
     )
}

function Show() {
    return (
        <div>
            <DateNow date={formatDate()}/>
            <DateNow date={formatDate()}/>
            <DateNow date={formatDate()}/>
        </div>
    )
}



class App extends Component {

  render() {
    return (
      <div className="App">
            <Show/>
      </div>
    );
  }
}

function tick() {
    ReactDOM.render(<App />, document.getElementById('root'));
}

setInterval(tick,1000)
```

# 组件传入的的属性必须是纯的 Props are Read-Only

> 正确的写法

```
function sum(a, b) {
  return a + b;
}
```
> 错误的写法 不能改变props的值


```
function withdraw(account, amount) {
  account.total -= amount;
}
```


> All React components must act like pure functions with respect to their props.
> react 的另一个属性state将可以间接的改变状态值，但是不违背它的初衷。
```


