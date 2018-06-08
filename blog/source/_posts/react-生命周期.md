---
title: react-生命周期
date: 2017-07-19
tags: react
---
# 对于在哪里进行setState()的操作请看下面这个例子

import React,{Component , PropTypes} from 'react'
import '../css/Life.scss';

class Life extends Component{
      constructor (props) {
          super(props)
          this.state={
              count:1,
              name:'点我',
              num:0
          }
          //有警告，页面能刷新正常运行，但是不会加1 此构造函数只执行一次
          // this.setState(prevState =>({count:prevState.count+1}))
          console.log("constructor",this.props,0);
          this.handleEvent = this.handleEvent.bind(this)
      }

      handleEvent () {

          this.setState(prevState => ({count:prevState.count+1}))
      }

      static propsTyps = {
          age:PropTypes.number,
          sex:PropTypes.string,
      }

       static defaultProps = {

       }

       componentWillMount () {
           //执行这个函数，然后加1，然后渲染 此构造函数只执行一次
           // this.setState(prevState =>({count:prevState.count+1}))
          console.log("componentWillMount,",111);
       }

       render(){
           console.log("render,",2222);
           //有警告，且直接运行不了 Maximum call stack size exceeded
           //  this.setState(prevState =>({count:prevState.count+1}))
          return (<div>
                <p>计数:{this.state.count}</p>
                <p>年龄:{this.props.age}</p>
                <button onClick={this.handleEvent}>{this.state.name}</button>
          </div>)
       }

       componentDidMount () {
            //渲染后，执行这个函数，然后又加1，再次渲染---此钩子只执行一次
           // this.setState(prevState =>({count:prevState.count+1}))
           console.log("componentDidMount,",3333);
       }

       componentWillReceiveProps (nextProps) {
           //这个主要用于父组件改变了传入的props，才进行触发事件
           //这个也可以支持设置状态
           //  this.setState(prevState =>({count:prevState.count+1}))
           console.log("componentWillReceiveProps",nextProps,4444);
       }

       shouldComponentUpdate(nextProps,nextState) {
           //他主要作用就是是否更新组件，true表示更新，false表示不更新
           //这个也可以支持设置状态，但是书上说不可以，也许有别的原因
           // this.setState(prevState =>({count:prevState.count+1}))
           // debugger;
           console.log(nextState,nextProps,55555);
           return true;
       }

       componentWillUpdate(nextProps,nextState) {
            //放在这里容易造成死循环
         // this.setState(prevState =>({count:prevState.count+1}))
           console.log(nextState,nextProps,66666);
       }

       componentDidUpdate() {
           //放在这里容易造成死循环,最好加判断
           if(this.state.count<20){
               this.setState(prevState =>({count:prevState.count+1}))
           }

           console.log('componentDidUpdate',77777);
       }
    
}

export default Life;

> 上面是子组件 

> 我是父组件

import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.scss';
import Life from './components/Life'

class App extends Component {
    constructor(props) {
        super(props)
        this.state={
            age:18
        }
    }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
            <Life age={this.state.age} sex="男"/>
            <input type="text" value={this.state.age} onChange={(e)=>{this.setState({age:e.target.value})}}/>
        </div>
      </div>
    );
  }
}

export default App;

# 总结

> 现在学的比较浅，组件有 construct componentWillMount() 以及componentDidMount在初始化过程中只执行一次,其他钩子函数在数据状态改变时会执行。

> 