---
title: react-State and Lifecycle
date: 2017-07-04
tags: react
---
# 利用定时器实现UI的刷新


```
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```
> 这样的方法导致ui每秒都在更新，即时用户没有改变数据也在实时刷新，导致性能差，替代的方法是定义一个state作为一个定时器，他类似于props，但是他是私有的，控制着整个组件。

# 从函数到类的转变 Converting a Function to a Class

> function的写法


```
function Add(props){
    return (<div>
         {props.a}+{props.b}={props.a+props.b}
    </div>)
}
```


> es6写法


```
class Add extends Component {
    render() {
        return (
            <div>
                这是es6的语法哦
                {this.props.a}+{this.props.b} = {this.props.a+this.props.b}
            </div>
        )
    }
}
```
>新增一个class constructor 来初始化 this.state


```
class Show extends Component{
    constructor(props) {
        super(props)
        this.state={
            name:'ly',
            age:18
        }
    }

    render () {
        return (
            <div>
                <p>name:{this.state.name}</p>
                <p>age:{this.state.age}</p>
            </div>
        )
    }

}
```

# 生命周期 Adding Lifecycle Methods to a Class

> componentDidMount执行的条件是在第一次加载组件完成时触发

> componentWillUnmount 执行的条件是组件即将被销毁

> 利用这两个钩子函数可以实现时钟的实时更新，仅在局部的更新


```
class Show extends Component{
    constructor(props) {
        super(props)
        this.state={
            name:'ly',
            age:18,
            date: new Date().toLocaleString()
        }
        
    }

    componentDidMount(){
        this.timer = setInterval(() => this.show(),1000)
    }

    show () {
        this.setState({
            date:new Date().toLocaleString()
        })
        
        //状态不能通过this.state.date=new Date().toLocalString() The only place where you can assign this.state is the constructor. 构造器可以直接操作
    }

    componentWillUnmount(){
            clearInterval(this.timer)
    }

    render () {
        return (
            <div>
                <p>name:{this.state.name}</p>
                <p>age:{this.state.age}</p>
                <p>现在的时间:{this.state.date}</p>
            </div>
        )
    }

}
```

# state 状态的改变是异步的 State Updates May Be Asynchronous

> 我们在使用props 和state 时 不应该依赖它们的值来计算下一个状态


```
//wrong

componentDidMount () {
        this.setState({
            counter1:this.state.counter1+this.state.counter2
        })
    
}

// correct
componentDidMount () {
        this.setState(function (prevState,props) {
            console.log(prevState,props);
             return {
                 counter1:prevState.counter1+props.counter2
             }
        })
    
}
```

# 父元素向子元素传递信息 The Data Flows Down

> A component may choose to pass its state down as props to its child components


```
class Down extends Component{
     constructor(props){
         super(props)
     }

     render () {
         return (
             <div>
                 <p>从父元素传数据过来了{this.props.data}</p>
             </div>
         )
     }
}


class App extends Component {
    constructor(props){
        super(props)
        this.state={
            data:"飞呀飞呀"
        }
    }

  render() {
    return (
      <div className="App">
            <Show/>
            <Add/>
            <Down data={this.state.data}/>

      </div>
    );
  }
}
```
>This is commonly called a "top-down" or "unidirectional" data flow
















