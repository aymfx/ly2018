---
title: react-Refs and the DOM
date: 2017-07-14
tags: react
---

# 有时候我们需要修改子元素，我们必须通过父元素的传递props来重新渲染，reac提供了方便修改子元素的方法，那就是采用refs属性进行操作dom，但是我们不要随便操作dom

## 什么时候使用refs

> 管理焦点，文本，媒体播放

> 需要触发的命令动画

> 继承的第三方dom库

# 举一个例子


```
// ref

class CustomTextInput extends Component {
    constructor(props){
        super(props)
        this.focus = this.focus.bind(this);
    }

    focus(){
        this.textInput.focus();
    }

    render(){
        return (<div>
            <input type="text"
                    ref={(input) => {this.textInput = input}}
            />
        </div>)
    }

}
```

> 我们必须在class定义的组件使用ref，是function将不起作用的，那是因为他们不存在实例，但是我们可以在function中具体的html元素或者类组件使用ref


```
function CustomTextInput(props) {
  // textInput must be declared here so the ref callback can refer to it
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={(input) => { textInput = input; }} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );  
}
```

# 暴露refs给父组件

> 在一些情况下，我们想访问父组件下的子组件，但是通常是不允许的，这会破坏组件的封装性，但是我们可以传一个特殊的属性给子元素，从而操作子元素的dom


```
function CustomTextInput(props) {
    console.log(props.inputRef);
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}

class Parent extends React.Component {


    render() {
        // console.log(this.inpsstElement);
        return (
            <CustomTextInput
                inputRef={el => this.inputElement  =el}
            />
        );
    }
}
```

> 以上的方式既适合class组件也是function组件







