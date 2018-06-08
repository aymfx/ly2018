---
title: react-Uncontrolled Components
date: 2017-07-17
tags: react
---

> 引用文字

# 不受控制的组件

> 受控制的组件表单数据由一个react组件处理，而不受控制的组件由dom元素自己处理

> 我们可以通过控制ref来跟新组件状态


```
class NameForm extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        console.log('A name was submitted:'+this.input.value);
        console.log('A age was submitted:'+this.refs.age.value);
        event.preventDefault();
    }

    render() {
       return ( <form onSubmit={this.handleSubmit}>
           <label>
               Name: <input type="text" ref={(input) =>this.input = input}/>
           </label>
           <label>
               age: <input type="text" ref="age"/>
           </label>
           <input type="submit" value="提交"/>
       </form>)
    }
}
```
# 默认值

> 对于checkbox和radio采用defaultChecked,对于select和textarea采用defaultValue


```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```







