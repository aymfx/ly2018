---
title: react-Handling Events
date: 2017-07-06
tags: react
---

# 事件处理函数

> 采用驼峰命名

> 使用JSX，将一个函数作为事件处理程序传递，而不是一个字符串


```
class Button extends Component{
    constructor (props) {
        super(props)

    }

    render () {
        return (
            <div>
                <button onClick={changeColor}>
                        我是按钮
                </button>
            </div>

        )
    }

}

function changeColor (){
    console.log("我被执行了");
}
```

> 在jsx语法中，必须要小心this，我们如果不绑定this。这个this将为undefined


```
class Toggle extends Component{
     constructor(props){
         super(props)
         this.state = {isToggleOn:true}
     // This binding is necessary to make `this` work in the callback
         this.handleClick = this.handleClick.bind(this)
     }

     handleClick(){
         // var that = this;
         this.setState(prevState =>({
             isToggleOn:!prevState.isToggleOn
         }));
     }

     render(){
         return (
             <div>
                 <button onClick={this.handleClick}>
                     {this.state.isToggleOn ? 'ON' : 'OFF'}
                 </button>
             </div>
         )
     }
}
```

# 两种方式解决 this的指向问题 

> 属性初始化语法property initializer syntax 


```
class Toggle extends Component{
     constructor(props){
         super(props)
         this.state = {isToggleOn:true}
     // This binding is necessary to make `this` work in the callback
     //     this.handleClick = this.handleClick.bind(this)
     }

     /*handleClick(){
         // var that = this;
         this.setState(prevState =>({
             isToggleOn:!prevState.isToggleOn
         }));
     }*/

    handleClick = () =>{
        this.setState(prevState =>({
            isToggleOn:!prevState.isToggleOn
        }));
    }

     render(){
         return (
             <div>
                 <button onClick={this.handleClick}>
                     {this.state.isToggleOn ? 'ON' : 'OFF'}
                 </button>
             </div>
         )
     }
}
```


> arrow function 箭头函数


```
class Toggle extends Component{
     constructor(props){
         super(props)
         this.state = {isToggleOn:true}
     // This binding is necessary to make `this` work in the callback
     //     this.handleClick = this.handleClick.bind(this)
     }

     handleClick(){
         // var that = this;
         this.setState(prevState =>({
             isToggleOn:!prevState.isToggleOn
         }));
     }

     render(){
         return (
             <div>
                 <button onClick={(e) =>this.handleClick(e)}>
                     {this.state.isToggleOn ? 'ON' : 'OFF'}
                 </button>
             </div>
         )
     }
}

//这种箭头函数方法每次执行都会创建不同的回调，大多数情况下是好的，但是在向子组件传递时，会导致子组件的再一次渲染。
```

# 

