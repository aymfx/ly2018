---
title: react-Lists and Keys
date: 2017-07-10
tags: react
---

# Rendering Multiple Components 如何重复渲染多个组件


```
//生成无序列表

function NumberList(props) {
        const numbers = props.numbers;
        const listItems = numbers.map((number) => <li>{number}</li>)
         return (
             <ul>
                 {listItems}
             </ul>
         )
}
```

> 在做循环渲染的时候，控制台会报出an array or iterator should have a unique "key" prop，我们必须添加一个key

>  const listItems = numbers.map((number) => <li **key={number.toString()**}>{number}</li>)

> Keys help React identify which items have changed, are added, or are removed

> 不推荐使用一下方式，因为列表一旦重新，它的效率非常慢
```
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
> 当li为根元素时，我们只能把key加到组件上

> Example: Incorrect Key Usage


```
function ListItem(props) {
  const value = props.value;
  return (
    // Wrong! There is no need to specify the key here:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

> Example: Correct Key Usage


```
function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
> 对于key值，只有在不同的数组上才能重复使用


```
//重复使用Key
class Blog extends Component {
    constructor(props){
        super(props)
    this.sidebar =(<ul>{props.posts.map((post) => <li key={post.id}>{post.title}</li>)}</ul>);
    this.content = props.posts.map((post) => <div key={post.id}><h3>{post.title}</h3>;<p>{post.content}</p> </div>);

    }

    render (){
         return (<div>
             {this.sidebar}
             <hr/>
             {this.content}
         </div>)
    }
}

const posts = [
    {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
```
# Embedding map() in JSX map的两种用法

> 第一种

```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```
> 第二种

```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```










