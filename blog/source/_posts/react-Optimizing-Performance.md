---
title: react-Optimizing Performance
date: 2017-07-18
tags: react
---

# 性能优化

> react做了很多处理，最大限度的减少了dom的操作，使我们能快速的开发，而不需要做很多操作，但是有些地方需要我们手动去操作react应用，提高性能

- 使用生产环境下的react.js,这样可以减少体积以及在生产环境下不需要的提示
- 创建 reactAPP ---> npm run build 进行打包压缩
- 利用branch创建更高效的生产版本 
  -  npm install --save-dev uglify-js-brunch  或者 yarn add --dev uglify-js-brunch
  -  brunch build -p
- 利用webpack创建，如果是用create-react创建的可以不考虑重新建

# 虚拟节点，避免重复渲染 


```
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

> 第一种方式

```
class CounterButton extends Component {
    constructor(props){
        super(props);
        this.state = {count:1}
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(this.props.color !== nextProps.color){
            return true;
        }
        if(this.state.count !==nextState.count){
            return true;
        }

        return false;
    }

    render(){
        return (

            <button
                color={this.props.color}
                onClick={()=>this.setState(state => ({count:state.count+1}))}>
            Count:{this.state.count}
            </button>

        )
    }
}
```

> 第二种方式


```
class CounterButton extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {count:1}
    }
    render(){
        return (

            <button
                color={this.props.color}
                onClick={()=>this.setState(state => ({count:state.count+1}))}>
                Count:{this.state.count}
            </button>

        )
    }
}
```

> 第二种适合复杂的情况下的浅比较，但是在某些情况下浅比较也会错失，如数据的突变情况


```
class ListOfWords extends React.PureComponent{
    render(){
        return (<div>{this.props.words.join(',')}</div>)
    }
}

class WordAdder extends Component {
    constructor(props){
        super(props);
        this.state = {words:['maodan']};
        this.handleClick = this.handleClick.bind(this);
    }

     handleClick(){
         //这是造成不跟新的原因
        const words  =this.state.words;
        words.push('iloveyou');
        this.setState({words:words})
    
    }



    render(){
        return(<div>
            <button onClick={this.handleClick}>确定</button>
            <ListOfWords words={this.state.words}/>
        </div>)
    }

}
```

```
//可以使用concat链接解决、


handleClick() {
        this.setState(prevState =>({words:[...prevState.words,'iloveyou']}))
    }
```

> 不可变的数据结构为您提供了一种跟踪对象变化的廉价方法，这就是我们需要实现的组件。这通常会给你带来一个很好的性能提升

> 没怎么看懂  https://facebook.github.io/react/docs/optimizing-performance.html



