---
title: react -Forms
date: 2017-07-11
tags: react
---

# react中的表单

```
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```
# 控制组件 Controlled Components

>将用户操作输入框与setState()状态值改变联合起来，从而实现单一数据流，这叫控制组件


```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

# The textarea Tag  

> 对于文本框，react依然通过value来进行操作


```
<form onSubmit={this.handleSubmit}>
    <label>
      Name:
      <textarea value={this.state.value} onChange={this.handleChange} />
    </label>
    <input type="submit" value="Submit" />
</form>
```

# The select Tag

> 对于下拉框，我们将默认值放在了select上,于是只要更新一个地方就好


```
<form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
</form>
```


```
class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state ={
            isGoing:true,
            numberOfGuests:2
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target =event.target;
        const value =target.type == 'checkbox' ? target.checked : target.value;
        const name =target.name;
        console.log(value,name,520)
        this.setState({
            [name]:value
        })
    }

    render () {
         return (
             <form>
                 <label>
                     Is going:
                     <input type="checkbox" name="isGoing"
                            checked={this.state.isGoing}
                            onChange={this.handleInputChange}
                     />
                 </label>
                 <br/>
                 <laber>
                     Number of guests:
                     <input type="number"
                            name="numberOfGuests"
                            value={this.state.numberValue}
                            onChange={this.handleInputChange}
                     />
                 </laber>
             </form>
         )
    }
}
```






