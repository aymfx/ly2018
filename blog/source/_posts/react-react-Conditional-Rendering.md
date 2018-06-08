---
title: react- react-Conditional Rendering
date: 2017-07-09
tags: react
---

# 条件渲染，通过某些条件加载不同功能的组件

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
        if(this.state.isToggleOn){
            return (
                <div>
                    <button onClick={this.handleClick}>
                        {this.state.isToggleOn ? 'ON' : 'OFF'}
                    </button>
                    <UserGreeting/>

                </div>
            )
        }else{
            return (
                <div>
                    <button onClick={this.handleClick}>
                        {this.state.isToggleOn ? 'ON' : 'OFF'}
                    </button>
                    <GuestGreeting/>

                </div>
            )
        }
     }
}

function UserGreeting(props) {
    return (
        <div>
            <h1>
                Welcome back!
            </h1>
        </div>
    )
}

function GuestGreeting(props) {
    return (
        <div>
            <h1>
                sign up
            </h1>
        </div>
    )
}
```

# Element Variables  元素变量 通过条件展示适合的组件


```
class LoginControl extends Component {
     constructor(props){
         super(props)
         this.handleLoginClick = this.handleLoginClick.bind(this);
         this.handleLogoutClick = this.handleLogoutClick.bind(this);
         this.state = {isLoggedIn:false}
     }

     handleLoginClick() {
         this.setState({isLoggedIn:true})
     }
    handleLogoutClick(){
         this.setState({isLoggedIn:false})
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;

        if(isLoggedIn) {
            button = <LogoutButton onClick ={this.handleLogoutClick} />
        }else{
            button = <LoginButton onClick ={this.handleLoginClick} />
        }

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}

function UserGreeting() {
    return <h1>Welcome back!</h1>
}

function GuestGreeting() {
    return <h1>please sign up</h1>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return <UserGreeting/>
    }
        return <GuestGreeting/>
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    )
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            logout
        </button>
    )
}
```

# Inline If with Logical && Operator

> 在jsx中可以插入任何表达式在花括号中，当然也包括元素

```
function Mailbox (props) {
    const unreadMessages  = props.unreadMessages;
    return (
        <div>
            <h1>
                Hello!
            </h1>
            {
                unreadMessages.length >2 &&
                    <h2>
                        you have {unreadMessages.length} unread messages.
                    </h2>
            }
            //表达式为真输出元素
        </div>
    )
}

const messages = ['React','re:react','react:React'];
```

# nline If-Else with Conditional Operator

> 改写上面的例子


```
class LoginControl extends Component {
     constructor(props){
         super(props)
         this.handleLoginClick = this.handleLoginClick.bind(this);
         this.handleLogoutClick = this.handleLogoutClick.bind(this);
         this.state = {isLoggedIn:false}
     }

     handleLoginClick() {
         this.setState({isLoggedIn:true})
     }
    handleLogoutClick(){
         this.setState({isLoggedIn:false})
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;

        let button = null;

        /*if(isLoggedIn) {
            button = <LogoutButton onClick ={this.handleLogoutClick} />
        }else{
            button = <LoginButton onClick ={this.handleLoginClick} />
        }*/

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {
                    isLoggedIn ? (<LogoutButton onClick ={this.handleLogoutClick} />) :
                        (<LoginButton onClick ={this.handleLoginClick} />)
                }
            </div>
        )
    }
}
```
# Preventing Component from Rendering 阻止组件的渲染

//阻止组件的渲染


```
function WaringBanner(props) {
    if(!props.warn){
        console.log("nihao ");
        return null;
    }

    return (<div className="waring">警告</div>)
}

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {showWarning:true}
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(
            prevState =>({
                showWarning:!prevState.showWarning
            })
        )
    }
    render (){
        return (<div>
            <WaringBanner warn={this.state.showWarning}/>
            <button onClick={this.handleToggleClick}>
                {this.state.showWarning ? 'Hide' : 'Show'}
            </button>
        </div>)
    }
}
```











